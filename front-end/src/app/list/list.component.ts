import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	posts: Post[];

	constructor(
		private blogService: BlogService,
		private router: Router
	) { }

	ngOnInit() {
		this.getPosts();
	}

	getPosts(): void {
		this.posts = this.blogService.getPosts();
	}

	newPost(): void {
		let newPost = this.blogService.newPost();
		this.router.navigateByUrl(`/edit/${newPost.postid}`);
	}

}
