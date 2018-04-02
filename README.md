# Markdown-Blog-MEAN-Stack
A Markdown Blogging Web Application Based on MEAN Stack. The front-end markdown blog editor and previewer is developed by Angular CLI. The back-end blog server that implement the RESTful API to save and publish blog posts is developed by Node.js, Express and MongoDB; JSON Web Token (JWT) was used to authenticate users.


## Front-end
Developed by Angular CLI

<table>
<thead>
<tr>
<th style="text-align: left;">URL</th>
<th style="text-align: left;">state</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;"><code>/</code></td>
<td style="text-align: left;">This default path shows only the list pane, without showing the edit or preview view</td>
</tr>
<tr>
<td style="text-align: left;"><code>/edit/:id</code></td>
<td style="text-align: left;">This path shows the list pane and the &quot;edit view&quot; for the post with <code>postid=id</code></td>
</tr>
<tr>
<td style="text-align: left;"><code>/preview/:id</code></td>
<td style="text-align: left;">This path shows the list pane and the &quot;preview view&quot; of the post with <code>postid=id</code></td>
</tr>
</tbody>
</table>

## Back-end
Developed by Node.js, Express and MongDB

<table>
<thead>
<tr>
<th style="text-align: left;">#</th>
<th style="text-align: left;">URL</th>
<th style="text-align: left;">method</th>
<th style="text-align: left;">functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">1</td>
<td style="text-align: left;"><code>/blog/:username/:postid</code></td>
<td style="text-align: left;">GET</td>
<td style="text-align: left;">Return an HTML-formatted page that shows the blog post with <code>postid</code> written by <code>username</code>.</td>
</tr>
<tr>
<td style="text-align: left;">2</td>
<td style="text-align: left;"><code>/blog/:username</code></td>
<td style="text-align: left;">GET</td>
<td style="text-align: left;">Return an HTML page that contains first 5 blog posts by <code>username</code>.</td>
</tr>
<tr>
<td style="text-align: left;">3</td>
<td style="text-align: left;"><code>/login?username=:username &amp;password=:password &amp;redirect=:redirect</code></td>
<td style="text-align: left;">GET</td>
<td style="text-align: left;">If either <code>username</code> or <code>password</code> is missing or if they don't match to our record, return an HTML page with the username and password form fields. If they match, set an authentication session cookie in JSON Web Token (JWT), and redirect to <code>redirect</code>.</td>
</tr>
<tr>
<td style="text-align: left;">4</td>
<td style="text-align: left;"><code>/api/:username</code></td>
<td style="text-align: left;">GET</td>
<td style="text-align: left;">This is the REST API used by the Angular blog editor to retrieve all blog posts by <code>username</code></td>
</tr>
<tr>
<td style="text-align: left;">5</td>
<td style="text-align: left;"><code>/api/:username/:postid</code></td>
<td style="text-align: left;">GET, POST, PUT, DELETE</td>
<td style="text-align: left;">This is the REST API used by the Angular blog editor to perform a CRUD operation on the user's blog post</td>
</tr>
<tr>
<td style="text-align: left;">6</td>
<td style="text-align: left;"><code>/edit/</code></td>
<td style="text-align: left;">GET</td>
<td style="text-align: left;">The main URL from which the user can access the Angular blog editor app</td>
</tr>
</tbody>
</table>
