import * as userConf from '../constants/common';
import {history} from '../history';

export function syncActionCreator(type,payload){
	return {
		type:type,
		payload:payload,
	}
}

export function navigate(routePath){
    history.push(routePath);
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
