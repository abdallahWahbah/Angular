import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "shorten"
})
export class ShortenPipe implements PipeTransform
{
    // value is the property you are rendering(server.name), we don't pass it
    transform(value: any, limit: number) {
        if(value.length > limit) return value.substr(0, limit) + "...";
        else return value
    }
}