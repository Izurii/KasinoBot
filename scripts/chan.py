from dotenv import load_dotenv
import requests, json, mimetypes
from lxml.html import fromstring
from itertools import cycle
import traceback, sys, random, time, hashlib, os

#Sys argvs
tags = sys.argv[1]
guild_id = sys.argv[2]

#Images path with guild
path = "images/"+guild_id+"/"

isDir = os.path.isdir(path)
if isDir == False:
    os.mkdir(path)

#Global var
tempts = 0

#Args for getting the file url
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0'}
proxies={"https": os.getenv("WEBSHARE_PROXY")}
url_get_file_url = os.getenv("SANKAKU_COMPLEX_CHAN_BASE_URL")
url_get_file_url += '&tags='+tags+'+-video' if tags!="" else ''

def get_file_url():
	try:
		global tempts
		tempts+=1
		response = requests.get(url_get_file_url, headers=headers,proxies=proxies)
		response_get_file_url = json.loads(response.text)
		response_json_length = len(response_get_file_url)
		
		if response_json_length == 0:
			return print("nothing")

		random_index = random.randint(0, (response_json_length-1))
		filesize = response_get_file_url[random_index]['file_size'] / 1000000
		
		if tempts == 10:
			return print("tempts")

		if filesize > 20:
			get_file_url()

		score = response_get_file_url[random_index]['total_score']
		file_url = response_get_file_url[random_index]['file_url']
		download_file(file_url, score)
	except Exception as e:
		print("Skipping. Connnection error getting file url"+e)

def download_file(url, score):
	filename_temp = str(time.time())+str(random.randint(0, 999999))
	filename = hashlib.sha224(filename_temp.encode('utf-8')).hexdigest()
	try:
		response = requests.get(url, headers=headers, proxies=proxies)
		content_type = response.headers['content-type']
		extension = mimetypes.guess_extension(content_type)

		if extension.lower() == ".jpe":
			extension = ".jpg"

		file = open(path+filename+extension, "wb")
		file.write(response.content)
		file.close()
		print(filename+extension, score)
	except Exception as e:
		print("Skipping. Connnection error downloading"+e)

get_file_url()
