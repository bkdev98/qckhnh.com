---
title: JAMstack và tương lai của Static Web Applications
description: >-
  Một tech stack phổ biến được mình sử dụng trong năm vừa rồi là JAMstack, ứng
  dụng trong việc xây dựng website tĩnh.
thumbnail: /assets/jamstack.png
date: '2019-07-09'
---
Một tech stack phổ biến được mình sử dụng trong năm vừa rồi là JAMstack, ứng dụng trong việc xây dựng website tĩnh.

Khái niệm web tĩnh đã có mặt rất sớm khi những trang web đầu tiên được xây dựng từ thế kỷ trước, và dần trở nên lỗi thời khi các ứng dụng web động với tính năng vượt trội hơn xuất hiện. Tuy nhiên trong vài năm trở lại đây, những web tĩnh *(Static Web Applications)* này đã có những bước phát triển đáng chú ý. Chúng không còn chỉ là một tệp html với và dòng code giao diện mà đã có thể trở thành một ứng dụng với đầy đủ các chức năng mạnh mẽ. Cái tên *tĩnh* đã không chỉ là tĩnh, mà đã trở thành một cách khác để xây dựng các ứng dụng, với JAMstack là một đại diện tiêu biểu.

JAMstack viết tắt cho Javascript, API và Markup, đang dần trở nên phổ biến bên cạnh những stack quen thuộc như LAMP, MEAN hay MERN. Khái niệm JAMstack được phổ biến bởi [Mathias Biilmann](https://twitter.com/biilmann) (CEO và Co-founder của Netlify).
> A modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.
-- Mathias Biilmann

Khi chúng ta nói về *Stack*, ta không nói về một hệ điều hành, một web server, một ngôn ngữ xây dựng backend hay một cơ sở dữ liệu cụ thể. JAMstack không phải là những công nghệ cụ thể. Nó là một ý tưởng để xây dựng website và ứng dụng mang đến hiệu năng và tính bảo mật cao hơn, với chi phí ít hơn, và một trải nghiệm lập trình tốt hơn.

 [https://jamstack.org/](https://jamstack.org/) 

Một website được xây dựng với JAMStack cần đạt những tiêu chuẩn:

* **JavaScript**: Sử dụng JS và chạy hoàn toàn trên client. Có thể dùng những frontend framework như React, Vue hay Angular, thậm chí là JS thuần.
* **APIs**: Mọi quá trình trên server hoặc cơ sở dữ liệu được chuyển thành những API có thể tái sử dụng và được truy cập thông qua HTTP với JavaScript. Chúng có thể được tự xây dựng hoặc sử dụng của bên thứ ba.
* **Markup**: Dữ liệu và template được kết hợp trong thời gian build, thường là thông qua những static site generator như [GatsbyJS](https://gatsbyjs.org/) , [Nuxt.js](https://nuxtjs.org/) , [Hugo](https://gohugo.io/),… cho web nội dung, hoặc những build tool như [Webpack](https://webpack.js.org/) , [ParcelJS](https://parceljs.org/)… cho web ứng dụng.

Như vậy, một ứng dụng *không phải* JAMstack nếu:

* Xây dựng bằng một server-side CMS như WordPress hay Drupal.
* Là một server web app dựa trên những ngôn ngữ backend như PHP, Node,...
* Là một single page app (SPA).

Khi xây dựng dự án với JAMstack, nên cân nhắc những tiêu chí sau:

* Toàn bộ ứng dụng được deploy lên CDN.
* Tự động build và deploy.
* Vô hiệu hóa bộ nhớ đệm.
* Quản lý thông qua Git.

Dưới đây là các công nghệ mình hay sử dụng để xây dựng website tĩnh với JAMstack.

### GatsbyJS

Gatsby là một giải pháp hoàn hảo cho JAMstack, một *blazing-fast* Static Site Generator của React. Gatsby giúp bạn tạo website tĩnh có hiệu năng và tốc độ cao, sử dụng những công nghệ web hiện đại, và hỗ trợ truy vấn dữ liệu từ nhiều nguồn với GraphQL.

Chi tiết:  [http://gatsbyjs.com](http://gatsbyjs.com/) 

### Netlify CMS

[Netlify CMS](https://www.netlifycms.org/) là một hệ quản lý nội dung mã nguồn mở cho Git và có thể cấu hình dễ dàng với Gatsby.

* Miễn phí và mã nguồn mở.
* Hỗ trợ nhiều kiểu backend: Github, Gitlab,…
* Dùng tốt cho cả side lẫn client projects.
* Cấu hình đơn giản.
* Xây dựng với ReactJS.

Một số giải pháp CMS khác cho Gatsby: Drupal, DatoCMS, Contentful, WordPress,…

### Netlify

Một giải pháp đơn giản để deploy web tĩnh với nhiều tính năng mạnh mẽ, đặc biệt khi kết hợp với Netlify CMS:

* Chi phí tiết kiệm.
* Hỗ trợ CI/CD và Serverless.
* Quản lý người dùng với Netlify Identify.
* Quản lý Forms trên trang.
* Tính năng tự động tối ưu website.
* Cung cấp giải pháp riêng cho người dùng doanh nghiệp.
* …

Chi tiết: netlify.com

### Full text search với Algolia và Lunr.js

Chi tiết: [Algolia](https://www.algolia.com/).

## Kết luận
Mọi người có thể tham khảo mã nguồn website qckhnh.com được mình xây dựng với JAMstack: [Github](https://github.com/bkdev98/qckhnh.com)

Tìm hiểu thêm về JAMstack qua [website chính thức](https://jamstack.org/) và mục [resources](https://jamstack.org/resources/).

Một bài viết hay so sánh giữa Gatsby và Wordpress và tương lai của Gatsby: [Gatsby is the future | Oliver Phillips - UI Developer](https://oliverjam.es/blog/gatsby-future).
