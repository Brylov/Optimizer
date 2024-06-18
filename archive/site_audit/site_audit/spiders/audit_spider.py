import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy.crawler import CrawlerProcess
from scrapy import signals
from urllib.parse import urlparse, unquote
import os
from jinja2 import Environment, FileSystemLoader
import pdfkit
import datetime

class AuditSpider(CrawlSpider):
    name = 'audit'

    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'DOWNLOAD_DELAY': 0.2,
        'COOKIES_ENABLED': True,
        'DEFAULT_REQUEST_HEADERS': {
            'Accept-Encoding': 'gzip, deflate',  # Avoid Brotli
        },
        'ITEM_PIPELINES': {
            '__main__.CollectItemsPipeline': 1,
        },
    }

    rules = (
        Rule(LinkExtractor(), callback='parse_item', follow=True),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.start_urls = [kwargs.get('start_url')]
        self.allowed_domains = [urlparse(kwargs.get('start_url')).netloc]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse_root)

    def parse_root(self, response):
        yield from self.parse_item(response)
        for link in LinkExtractor().extract_links(response):
            yield scrapy.Request(link.url, callback=self.parse_item)

    def parse_item(self, response):
        def extract_text(xpath):
            return response.xpath(xpath).get().strip() if response.xpath(xpath).get() else 'N/A'

        yield {
            'url': unquote(response.url),
            'status': response.status,
            'title': extract_text('//title/text()').encode('utf-8').decode('utf-8'),
            'meta_description': extract_text('//meta[@name="description"]/@content').encode('utf-8').decode('utf-8'),
            'h1': [h.encode('utf-8').decode('utf-8') for h in response.xpath('//h1/text()').getall()],
            'h2': [h.encode('utf-8').decode('utf-8') for h in response.xpath('//h2/text()').getall()],
            'h3': [h.encode('utf-8').decode('utf-8') for h in response.xpath('//h3/text()').getall()],
            'word_count': len(response.xpath('//body//text()').getall()),
            'images': response.xpath('//img/@src').getall(),
            'alt_texts': [alt.encode('utf-8').decode('utf-8') for alt in response.xpath('//img/@alt').getall()],
            'internal_links': [unquote(link) for link in response.xpath('//a[starts-with(@href, "/") or starts-with(@href, "https://%s")]/@href' % self.allowed_domains[0]).getall()],
            'external_links': [unquote(link) for link in response.xpath('//a[not(starts-with(@href, "/")) and not(contains(@href, "%s"))]/@href' % self.allowed_domains[0]).getall()],
            'canonical': extract_text('//link[@rel="canonical"]/@href').encode('utf-8').decode('utf-8'),
            'load_time': response.meta['download_latency'],
        }

class CollectItemsPipeline:
    def __init__(self):
        self.items = []

    def process_item(self, item, spider):
        self.items.append(item)
        return item

    def close_spider(self, spider):
        spider.items = self.items

def analyze_title(title):
    if not title:
        return 'Missing title tag'
    elif len(title) > 60:
        return 'Title tag is too long'
    else:
        return 'Title tag is fine'

def analyze_meta_description(meta_description):
    if not meta_description:
        return 'Missing meta description'
    elif len(meta_description) > 160:
        return 'Meta description is too long'
    else:
        return 'Meta description is fine'

def analyze_headings(h1, h2, h3):
    if not h1:
        return 'Missing H1 tag'
    elif len(h1) > 1:
        return 'Multiple H1 tags found'
    else:
        return 'Headings are fine'

def analyze_images(images, alt_texts):
    if not images:
        return 'No images found'
    missing_alt = [img for img, alt in zip(images, alt_texts) if not alt]
    if missing_alt:
        return f'Missing alt text for images: {missing_alt}'
    else:
        return 'All images have alt text'

def analyze_links(links):
    if not links:
        return 'No links found'
    else:
        return f'Found {len(links)} links'

def analyze_canonical(canonical):
    if not canonical:
        return 'Missing canonical tag'
    else:
        return 'Canonical tag is fine'

def analyze_load_time(load_time):
    if load_time > 2:
        return f'Page load time is too long: {load_time} seconds'
    else:
        return f'Page load time is fine: {load_time} seconds'

def analyze_seo(data):
    report = {
        'url': data['url'],
        'title': analyze_title(data['title']),
        'meta_description': analyze_meta_description(data['meta_description']),
        'headings': analyze_headings(data['h1'], data['h2'], data['h3']),
        'word_count': data['word_count'],
        'images': analyze_images(data['images'], data['alt_texts']),
        'internal_links': analyze_links(data['internal_links']),
        'external_links': analyze_links(data['external_links']),
        'canonical': analyze_canonical(data['canonical']),
        'load_time': analyze_load_time(data['load_time']),
    }
    return report

def decode_url(url):
    return unquote(url)

def generate_report(items):
    template_dir = os.path.abspath(os.path.dirname(__file__))
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template('report_template.html')
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    html_out = template.render(items=items, current_time=now)
    
    # Adjust the path to wkhtmltopdf as needed
    path_to_wkhtmltopdf = '/usr/bin/wkhtmltopdf'  # Update this path as per your installation
    config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)
    pdfkit.from_string(html_out, 'seo_report.pdf', configuration=config)

def crawl_and_generate_report(start_url):
    items = []

    def spider_closed(spider):
        nonlocal items
        items = spider.items

    process = CrawlerProcess()
    crawler = process.create_crawler(AuditSpider)
    crawler.signals.connect(spider_closed, signal=signals.spider_closed)
    process.crawl(crawler, start_url=start_url)
    process.start()

    # Add analysis to each item
    for item in items:
        item['title_analysis'] = analyze_title(item['title'])
        item['meta_description_analysis'] = analyze_meta_description(item['meta_description'])
        item['images_analysis'] = analyze_images(item['images'], item['alt_texts'])
        item['canonical_analysis'] = analyze_canonical(item['canonical'])
        item['headings_analysis'] = analyze_headings(item['h1'], item['h2'], item['h3'])
        item['load_time_analysis'] = analyze_load_time(item['load_time'])
        item['internal_links_analysis'] = analyze_links(item['internal_links'])
        item['external_links_analysis'] = analyze_links(item['external_links'])
        item['decoded_url'] = decode_url(item['url'])  # Decode the URL

    generate_report(items)

if __name__ == '__main__':
    url = input("Enter the URL to audit: ")
    crawl_and_generate_report(url)
