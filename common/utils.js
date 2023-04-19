

//传入时间期限 判断 是否超过期限
export function isTimeOut(startTime,endTime){
	const start = new Date(startTime);
	const end = new Date(endTime);
	const now = new Date()
	return start < now && now < end;
}