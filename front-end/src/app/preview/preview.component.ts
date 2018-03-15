import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Parser, HtmlRenderer } from 'commonmark';
import { Post, BlogService } from '../blog.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

	post: Post;
	renderedTitle: string;
	renderedBody: string;

	constructor(
		private blogService: BlogService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.getPost();
		this.activatedRoute.params.subscribe(() => this.getPost());
	}

	ngAfterViewChecked() {
		if(this.post)
			this.render();
	}

  	getPost(): void {
		const id = +this.activatedRoute.snapshot.paramMap.get('id');
		this.post = this.blogService.getPost(id);
	}

	render(): void {
		var reader = new Parser();
		var writer = new HtmlRenderer();
		var parsed = reader.parse(this.post.title);
		this.renderedTitle = writer.render(parsed);
		parsed = reader.parse(this.post.body);
		this.renderedBody = writer.render(parsed);
		
		document.getElementById("title").innerHTML = this.renderedTitle;
		document.getElementById("body").innerHTML = this.renderedBody;
	}

}
