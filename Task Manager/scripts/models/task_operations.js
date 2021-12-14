const opns = {
  tasks: [],
  isAsc : true,
  countRecords() {
    return this.tasks.length;
  },
  convertobjintotask(tasksobj) {
    this.tasks = tasksobj.map(
      (obj) =>
        new Task(obj.id, obj.name, obj.desc, obj.date, obj.url, obj.priority)
    );
    return this.tasks;
  },
  add(task) {
    let taskobj = new Task(
      task.id,
      task.name,
      task.desc,
      task.date,
      task.url,
      task.priority
    );
    this.tasks.push(taskobj);
  },
  remove() {
    this.tasks = this.tasks.filter((task) => task.markdel == false);
  },
  countmark() {
    return this.tasks.filter((task) => task.markdel).length;
  },
  mark(id) {
    let taskobj = this.searchbyId(id);
    if (taskobj) {
      taskobj.toggle();
    }
  },
  searchbyId(id) {
    return this.tasks.find((task) => task.id == id);
  },
  update() {},
  sort() {
    if(this.isAsc){
      this.tasks.sort((first,second) => first.name.localeCompare(second.name));
    }
    else{
      this.tasks.sort((first,second) => second.name.localeCompare(first.name));
    }
    this.isAsc = !this.isAsc;
  },
};
