import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map, Subject, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class PostsService
{
    error = new Subject<string>();
    constructor(private http: HttpClient){}
    
    createPostService(title: string, content: string)
    {
        const postData = {title, content};

        this.http
        .post("https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json", postData,
        {
            // to get the status code and ok property and some other information
            observe: "response"
        })
        .subscribe(response => 
        {
            console.log(response)
        }, error =>
        {
            this.error.next(error.message);
        })
        // the request in only sent when you subscribe
    }

    fetchPostsService()
    {
        let multipleParams = new HttpParams();
        multipleParams = multipleParams.append("print", "pretty");
        multipleParams = multipleParams.append("name", "abdalla");
        
        return this.http
        .get("https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json",
        {
            headers: new HttpHeaders({"Custom-Header": "Hello"}),
            // params: new HttpParams().set("print", "pretty") // https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json?print=pretty
            params: multipleParams // https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json?print=pretty&name=abdalla
        })
        .pipe(map(responseData => { // you can comment the pipe function to see the response comming from the subscribe
        const postsArray = [];
        for(let key in responseData)
        {
            if(responseData.hasOwnProperty(key))
            {
            postsArray.push({...responseData[key], id: key})
            }
        }
        return postsArray;
        }), catchError(errorRes => 
        {
            return throwError(errorRes); // neglect the catchError
        }))
    }

    deletePostsService()
    {
        return this.http.delete("https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json")
    }

}