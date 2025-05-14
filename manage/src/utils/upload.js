const qiniu=require('qiniu')

var accessKey = 'oF1fdJOoGr36XlVyLH70kAbxRlu3d3C76ceDwSS6'; // 这里换成自己的accessKey -在七牛云后台有，直接复制过来
var secretKey = 't0OdQGbjHw6_H8yVX2qCEcpmDTN32-GCrKcvtpRk'; // 这里换成自己的secretKey -在七牛云后台有，直接复制过来
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
	scope: 'shop-database', // 必填, 七牛云控制台添加的空间名称
	// expires: 7200,  // expires非必填， 在不指定上传凭证的有效时间情况下，默认有效期为1个小时。expires单位为秒
	returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
	// returnBody非必填， 有时候我们希望能自定义这个返回的JSON格式的内容，可以通过设置returnBody参数来实现。
};
var putPolicy = new qiniu.rs.PutPolicy(options); // 配置
var uploadToken = putPolicy.uploadToken(mac); // 获取上传凭证
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
// 是否使用https域名
config.useHttpsDomain = true;
// 上传是否使用cdn加速
config.useCdnDomain = true;
var formUploader = new qiniu.form_up.FormUploader(config);

// formUploader.putFile方法上传文件
// 第一个属性为上传凭证
// 第二个属性为上传文件要以什么命名  null 则随机命名
// 第三个为文件的相对地址， 相对为当前执行文件的地址
// 第四个属性putExtra， 应该是额外需要的参数，用new qiniu.form_up.PutExtra()获取
// 第五个为回调函数，respErr失败内容  respBody主体内容  respInfo信息内容
var putExtra = new qiniu.form_up.PutExtra();

// 上传以后的文件名
const filename = 'node' + new Date().getTime() + ('000000' + Math.floor(Math.random() * 999999)).slice(-6) + '.png';

// 文件根路径的地址-文件空间绑定的域名
const BaseUrl = 'https://s8vxww55i.hn-bkt.clouddn.com/';

// 上传成功后的返回值
let resdata = null;

var bucketManager = new qiniu.rs.BucketManager(mac, config);

export const uploadImg=(token,file)=>{
	formUploader.putFile(token, filename, file, putExtra, function (respErr, respBody, respInfo) {
		if (respErr) {
			  throw respErr;
		}
		if (respInfo.statusCode == 200) {
			  // 如果成功，这里内容便是 图片信息
			  console.log('Body',respBody);
			  console.log('Info',respInfo);
	 
				  resdata = {
					 url: BaseUrl + respBody.key,
					 fsize: respBody.fsize,
				  }
			 console.log('上传成功啦！',resdata);
		} else {
			  console.log(respInfo.statusCode);
			  console.log(respBody);
			 console.log('出错了', respBody)
		}
	 });
	 console.log('上传成功啦！',resdata);
	 return resdata;
}




