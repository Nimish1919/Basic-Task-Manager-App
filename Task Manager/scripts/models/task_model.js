class Task{
    constructor(id,name,desc,date,url,priority){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.date = date;
        this.url = url;
        this.priority = priority;
        this.markdel = false;
    }
    toggle(){
        this.markdel = !this.markdel;
    }
}