import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { Post, BlogService } from '../blog.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

	post: Post;

	sub;
	
	constructor(
		private blogService: BlogService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.getPost();
		this.activatedRoute.params.subscribe(() => this.getPost());
		if(this.post){
			this.sub = this.router.events.subscribe(event => {
				if(event instanceof NavigationStart)
					this.savePost();
			})
		}
	}

	getPost(): void {
		const id = +this.activatedRoute.snapshot.paramMap.get('id');
		this.post = this.blogService.getPost(id);
	}

	@HostListener('window:beforeunload')
	savePost(): void {
		if (document.getElementById("save") && document.getElementById("save").hasAttribute("disabled") === false){
			this.blogService.updatePost(this.post);
			document.getElementById("save").setAttribute("disabled", "");
		}
	}

	deletePost(): void {
		this.blogService.deletePost(this.post.postid);
	}

	enableSave(): void {
		document.getElementById("save").removeAttribute("disabled");
	}

	ngOnDestroy() {
		if(this.sub)
			this.sub.unsubscribe();
	}

}
