export function convertDate(day){
    var date=new Date(day)
    return date=((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
}

export function convertDate2(day){
    var date=new Date(day)
    return date=date.getFullYear()+'-'+( (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))+'-'+((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
}

