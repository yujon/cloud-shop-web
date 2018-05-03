import {Modal} from 'antd'

export function showShort(title,content,time=2000){
	let ref = Modal.info({
		title,
		content
	})
	setTimeout(() => {
	  ref.destory();
	}, time)
}

export function show(title,content,onOk,onCancel){
	let ref = Modal.info({
		title,
		content,
		onCancel,
		onOk
	})
}