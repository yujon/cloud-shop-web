import * as userConf from '../constants/common';

export function syncActionCreator(type,payload){
	return {
		type:type,
		payload:payload,
	}
}

//上传文件
export function uploadFile(file,fileName,callback){
    return {
        type:userConf.UPLOAD_FILE_REQUEST,
        callback,
        file,
        fileName,
        payload:{
            uploadFileStatus:'doing',
        }
    }
}
export function uploadFileSuccess(){
    return {
        type:userConf.UPLOAD_FILE_SUCCESS,
        payload:{
            uploadFileStatus:'success',
        }
    };
}
export function uploadFileFail(){
    return {
        type:userConf.UPLOAD_FILE_FAIL,
        payload:{
            uploadFileStatus:'fail',
        }
    }
}
