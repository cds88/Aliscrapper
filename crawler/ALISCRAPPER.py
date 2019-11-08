 
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup

from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time
import datetime

from selenium.webdriver.common.action_chains import ActionChains


LOGIN_URL = 'https://login.aliexpress.com/'

SEARCH_QUERY = "iphone"
SEARCH_CATEGORY = "Cellphones & Telecommunications"
SEARCH_PAGE_LIMIT = 3
USER_EMAIL = "parkron@wp.pl"
USER_PASSWORD = "crawler123"
 
class Alibrowser:
    def __init__(self):
        self.browser      =  None
        self.browser_type = "Firefox"
        self.loggedin     =  False
       
        self.itemData     =  []
        self.photos       =  []
        self.height       =  None
        self.currentHeight = None
        self.maxPage =     None
    
    def init(self):
        options = Options()
        #options.add_argument('--headless')
        if self.browser_type=="Firefox":
            self.browser = webdriver.Firefox(options=options)
        elif self.browser_type=="Chrome":
            self.browser = webdriver.Chrome(options=options)

    def __repr__(self):
        if self.loggedin:
            return 'User logged in on {}'.format(self.browser.current_url)
        else:
            return 'User not authorized'
 
    
    def __call__(self):
        self.init()
        self.login()
        time.sleep(10)
        self.prepare()
 
        self.kill_popup()
        self.category()
        time.sleep(3)
        self.Crawler()
        #self.quit()
        
    def Crawler(self, currentPage=1, page_limit = SEARCH_PAGE_LIMIT):
        self.kill_popup()
        self.scrollDown()
        if not self.maxPage:
            self.setMaxPage()
        time.sleep(2)
        
      
        time.sleep(2)
        linkLista = self.browser.find_elements_by_css_selector('.list-item .product-img')
        imageLists = self.fetchImages(linkLista)
       
        self.extractData(imageLists )
        if currentPage<page_limit:
            self.nextPage()
            return self.Crawler(currentPage+1)
        else:
            print("Finished crawling... \nsaving {} items to json file".format(len(self.itemData)))
            return self.saveData(self.itemData)

    def fetchImages(self, linkLists, imageLists=[], index=0):
        linkLists[index].click()
        time.sleep(3)
        self.browser.switch_to.window(self.browser.window_handles[1])
        time.sleep(1)
        self.kill_popup()
        
        images = []
        self.scroll()
        self.kill_popup()
        galleryVisible = False
        while not galleryVisible:
            try:
                slides = self.browser.find_elements_by_class_name('images-view-item')
                ActionChains(self.browser).move_to_element(slides[0]).perform()
                galleryVisible = True
            except:
                self.scroll()
                time.sleep(2)

        
        for i in self.browser.find_elements_by_class_name('images-view-item'):
            time.sleep(2.4)
            self.kill_popup()
            ActionChains(self.browser).move_to_element(i).perform()
            time.sleep(2)
            temp = self.browser.find_element_by_class_name('magnifier-image').get_attribute('src')
            images.append(temp)
            time.sleep(0.4)
                        
         
        imageLists.append(images)
        self.browser.close()
        self.browser.switch_to.window(self.browser.window_handles[0])
        index+=1
        
        if index==len(linkLists):
            return imageLists
        else:
            return self.fetchImages(linkLists, imageLists,index)

        
        
    def extractData(self, imageLists):
        self.kill_popup()
        self.scroll("-2000")
        self.scrollDown()        
        page_soup = BeautifulSoup(self.browser.page_source, 'lxml')
        containers = page_soup.findAll('li', {'class':'list-item'})
        itemList = containers
        
        wynik = []
        for index, item in enumerate(itemList):
            name = item.div.a.img['alt']
            seller= item.find('a', {'class':'store-name'})['title']
            price = item.find("span", {"class":"price-current"}).text
            link = 'https:'+item.a['href']
            try:
                thumb = 'https:'+item.img['src']
            except:
                try:
                    thumb = 'https:'+item.img['image-src']
                except:
                    thumb = ''
            temp={'name':name, 'seller':seller, 'price':price, 'link':link, 'thumb':thumb, 'images':imageLists[index]}
            wynik.append(temp)
        self.itemData.extend(wynik)   



        
    def loading(self):
        if self.browser.execute_script("return document.readyState"):
            print('Loaded')
            return "Loaded"
        else:
            time.sleep(3)
            print('Loading ...')
            return self.loading()

    def kill_popup(self):
        try:
            self.browser.find_elements_by_class_name("next-dialog-close")[0].click()
            return 'Popup killed'
        except:
            try:
                self.browser.find_elements_by_class_name('close-layer')[0].click()
                return 'Popup killed'
            except:
                return 'No popup'
        
          
    def dataLen(self):
        return len(self.itemData)
    def login(self):
        self.browser.get(LOGIN_URL)
 
        self.loading()
 
        frame = self.browser.find_element_by_id("alibaba-login-box")
        self.browser.switch_to.frame(frame)
        self.browser.find_element_by_id("fm-login-id").send_keys(USER_EMAIL)
        time.sleep(5)
        self.browser.find_element_by_id("fm-login-password").clear()
        time.sleep(4)
        self.browser.find_element_by_id("fm-login-password").send_keys(USER_PASSWORD)
        time.sleep(3)
        self.browser.find_elements_by_tag_name("button")[0].click()

     
        self.loading()
        self.browser.switch_to.default_content()
        self.authenticate()
        
        time.sleep(4)
        self.kill_popup()
        
    def authenticate(self):
        self.loggedin = True
        return 'User authenticated'

      

    def prepare(self, search_query=SEARCH_QUERY):
        self.loading()
        self.kill_popup()
        searchBox=self.browser.find_element_by_id("search-key")
        searchBox.clear()
        searchBox.send_keys(search_query)
        searchBox.send_keys(Keys.ENTER)
        self.loading()
        time.sleep(14)
        self.kill_popup()
        

    def category(self):
        self.kill_popup()
        self.browser.find_elements_by_link_text(SEARCH_CATEGORY)[0].click()
        time.sleep(4)
        self.kill_popup()
        

    def scroll(self, scrollLength="150"):
        self.browser.execute_script('window.scrollBy(0,{});'.format(scrollLength))

 
        

    def setCurrentHeight(self):
        self.currentHeight = self.browser.execute_script('return document.documentElement.scrollTop')
        return self.currentHeight

    def setMaxPage(self):
        limit = self.browser.find_element_by_xpath('//span[@class="total-page"]')
        self.maxPage = [int(s) for s in limit.text.split() if s.isdigit()][0]
        
 

     
    def scrollDown(self, previousHeight=None):
        self.scroll()
        time.sleep(0.7)
        currentHeight= self.setCurrentHeight()
        if previousHeight==currentHeight:
            self.browser.execute_script("var elem= document.getElementsByClassName('list-pagination');elem[0].scrollIntoView()")
            self.scroll('-200')
            self.scroll('-200')
            self.scroll('-120')
            return 'ITS OVER'
        else:
            return self.scrollDown(previousHeight=currentHeight)

    def checkView(self):
        return self.browser.execute_script("function inView(el) { let box = el.getBoundingClientRect(); return box.top < window.innerHeight && box.bottom >=0;  \
var elem= document.getElementsByClassName('list-pagination');elem[0].scrollIntoView() ;\
return inView(elem) }")
        

    def nextPage(self):
        button_list=self.browser.find_elements_by_tag_name('button')
        [i.click() for i in button_list if i.text=="Next"]
 

    def saveData(self, data):
        import json
        f = open('results.json', 'w')
        f.write(json.dumps(data))
        f.close()
 
    def quit(self):
        self.browser.quit()

 
aa= Alibrowser()
aa()
 
