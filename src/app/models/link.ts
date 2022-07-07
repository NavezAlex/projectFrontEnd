export class Link {
    public title : string;
    public url? : string;
    public id? : number;

    constructor(title :string, url? :string, id? : number){
        this.title = title;
        this.url = url;
        this.id = id;
    }
}