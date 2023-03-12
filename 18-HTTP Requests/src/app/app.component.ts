import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false; 
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {

    // that subscription is coming from createPostService in postsService to show you that you can make a subject in the postsService
    this.errorSubscription = this.postsService.error.subscribe(errorMessage => this.error = errorMessage);

    // this.getPosts();
    this.isFetching = true;

    this.postsService.fetchPostsService()
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts; 
    }, error =>
    {
      console.log(error);
      this.isFetching = false;
      this.error = error.message
    })
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createPostService(postData.title, postData.content)
  }

  onFetchPosts() {
    // this.getPosts();
    this.isFetching = true;

    this.postsService.fetchPostsService()
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts; 
    }, error => 
    {
      console.log(error);
      this.isFetching = false;
      this.error = error.message;
    })
  }

  onClearPosts() {
    this.postsService.deletePostsService().subscribe(()=>
    {
      this.loadedPosts = [];
    })
  }

  private getPosts()
  {
    this.isFetching = true;
    
    this.http
    .get("https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json")
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
    }))
    .subscribe(posts => {
      console.log(posts)
      this.loadedPosts = posts;
    });

    this.isFetching = false;
  }

  onHandleError()
  {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
