import requests, hashlib
import sys, os, random, time, mimetypes, glob
import wand, wand.color, wand.drawing
from io import BytesIO
from PIL import Image

#Sys argvs
scale = int(sys.argv[1])
url = sys.argv[2]
guild_id = sys.argv[3]

#Vars
perm_extensions = ['.jpg', '.png', '.bmp', '.ico']

#Images path with guild
path = "images/"+guild_id+"/"

#Filename hashed
filename_temp = str(time.time())+path+str(random.randint(0, 999999))
filename = hashlib.sha224(filename_temp.encode('utf-8')).hexdigest()

isDir = os.path.isdir(path)
if isDir == False:
    os.mkdir(path)

try:
	response = requests.get(url)
	content_type = response.headers['content-type']
	extension = mimetypes.guess_extension(content_type)
	if extension.lower() == ".jpe":
		extension = ".jpg"
except:
	print('error_request')

def remove_temp_files():
	for image in glob.glob(path+"{0}_*.png".format(filename)):
		os.remove(image)
def remove_all_files():
	for image in glob.glob(path+"{0}_*.*".format(filename)):
		os.remove(image)

def magik():

	data = response.content

	i = wand.image.Image(blob=data)
	i.alpha_channel = True
	i.transform(resize='800x800')
	i.liquid_rescale(width=int(i.width * 0.5), height=int(i.height * 0.5), delta_x=int(0.5 * scale) if scale else 1, rigidity=0)
	i.liquid_rescale(width=int(i.width * 1.5), height=int(i.height * 1.5), delta_x=scale if scale else 2, rigidity=0)
	i.save(filename=path+filename+'.jpg')

	print(filename+'.jpg')

def gmagik(rand, gif):
	try:
		try:
			frame = Image.open(BytesIO(gif.content))
		except Exception as e:
			print(e)

		nframes = 0
		while frame:
			frame.save('{0}/{1}_{2}.png'.format(path, rand, nframes), 'GIF')
			nframes += 1
			try:
				frame.seek(nframes)
			except EOFError:
				break
		imgs = glob.glob(path+"{0}_*.png".format(rand))
		for image in imgs:
			try:
				im = wand.image.Image(filename=image)
			except:
				continue
			i = im.clone()
			i.alpha_channel = True
			i.transform(resize='800x800>')
			i.liquid_rescale(width=int(i.width * 0.5), height=int(i.height * 0.5), delta_x=int(0.5 * scale) if scale else 1, rigidity=0)
			i.liquid_rescale(width=int(i.width * 1.5), height=int(i.height * 1.5), delta_x=scale if scale else 2, rigidity=0)
			i.resize(i.width, i.height)
			i.save(filename=image)
		return True
	except:
		remove_temp_files()
		print('gmagik')

def do_gmagik():
	try:
		gmagik(filename, response)
	except:
		remove_temp_files()
		print('error_wand')
	
	gifout = filename+'_final.gif'
	ffmpeg_command = 'ffmpeg -y -nostats -loglevel 0 -i '+path+'{0}_%d.png'.format(filename)+' '+path+gifout
	try:
		os.system(ffmpeg_command)
		remove_temp_files()
		print(gifout)
	except:
		remove_all_files()
		print('ffmpeg_error')

if extension.lower() == ".gif":
	do_gmagik()
elif extension.lower() in perm_extensions:
	magik()
else:
	print('extension')