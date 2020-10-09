import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { formatDistance } from 'date-fns';
import { NzMessageService, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { NewsService } from '../../../service/news/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ViewportScroller} from '@angular/common';
import { AuthService } from 'src/app/front-desk/auth/auth.service';

@Component({
  selector: 'app-news-details-modal',
  templateUrl: './news-details-modal.component.html',
  styleUrls: ['./news-details-modal.component.less'],
})
export class NewsDetailsModalComponent implements OnInit {
  articleId: number;
  isDelete: number;
  isLike: boolean;
  userId: number;
  articleLike: {};
  pageIndex = 1;
  pageSize = 5;

  comments = [];
  total: number = 0;

  dataList: any;
  displayData: any;
  tagList: any;
  loading: boolean = false;
  id: string;
  replyId: string;


  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  replyString = '';
  commentValue = this.replyString;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private newsService$: NewsService,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private routerInfo: ActivatedRoute,
    private _notification: NzNotificationService,
    private vps: ViewportScroller,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.userId = parseInt(window.localStorage.getItem("id"));
    this.searchArticlebyid();
    this.getArticleLike();
    this.getComments()
  }

  getComments() {
    this.newsService$.getCommentListByArticleId(this.pageIndex, this.pageSize, this.id).subscribe(result => {
      this.comments = result.data;
      this.total = this.comments.length > 0? this.comments[0].count: 0;
    })
  }

  addReplyValue(comment: any) {
    this.replyString = `回复@${comment.username}：  `;
    this.commentValue = this.replyString;
    this.replyId = comment.commentId;
    this.vps.scrollToAnchor('reply');
  }

  deleteComment(commentId: string, commentUserId:number) {
    if (!this.authService.userLoginChecker()) {
      this._notification.error("尚未登录", "");
      return;
    }

    if (!this.authService.userIdentityChecker("SUPER_ADMIN") && commentUserId != this.userId) {
      this._notification.error("权限不足", "");
      return;
    }
    
    this.newsService$.deleteComment(commentId).subscribe(result => {
      this._notification.success('删除成功！', '');
      this.getComments()
    }, error1 => {
      this._notification.error('删除失败！', error1.error)
    })
  }

  handleSubmit(): void {
    if (!this.authService.userLoginChecker()) {
      this._notification.error("尚未登录", "");
      return;
    }

    let content;
    let comment = {};
    let objecttype = '';
    if (this.commentValue.startsWith(this.replyString) && this.replyString !== '') {
       content = this.commentValue.split(this.replyString);
      if (content[1] == '') {
        this._notification.error('请填写评论内容！', '')
      }else {
        objecttype = 'comment';
        this.submitting = true;
        comment = {
          content: content[1],
          objectid: this.replyId,
          userId: this.userId
        };
      }
    }else {
      console.log(this.commentValue);
      this.submitting = true;
      objecttype = 'article';
      comment = {
        content: this.commentValue,
        objectid: this.id,
        userId: this.userId
      }
    }

      this.newsService$.insertComment(comment, objecttype).subscribe(result => {
        this.submitting = false;
        if (objecttype == 'article') {
          this.pageIndex = Math.ceil((this.total + 1) / this.pageSize);
        }
        this.getComments();
        this.commentValue = '';
        this.replyString = '';
        this.replyId = '';
        this._notification.success('评论成功！','')
      }, error1 => {
        this.submitting = false;
        this._notification.error('评论失败！', '')
      })
  }

  searchArticlebyid() {
    this.displayData = [];
    this.loading = true;
    this.newsService$.getArticlebyid(this.id).subscribe(result => {
      this.loading = false;
      this.dataList = result;
      this.displayData = this.dataList;
      this.tagList = this.dataList.tagList;
    }, error1 => {
      this.loading = false;
      this._message.error(error1.error);
    });
  }
  getArticleLike() {
    if (this.userId) {
      this.loading = true;
      this.newsService$.getArticleLike(this.id, this.userId).subscribe(result => {
        this.loading = false;
        this.isLike = result.data;
      }, error1 => {
        this.loading = false;
        this._message.error(error1.error);
      });
    }
  }
  getAriticlelikes(){
    this.newsService$.getArticlebyid(this.id).subscribe(result => {
      this.displayData.upsnum = result.upsnum;
    }, error1 => {
      this._message.error(error1.error);
    });
  }
  setArticleLike() {
    if (!this.authService.userLoginChecker()) {
      this._notification.error("尚未登录", "");
      return;
    }

    this.loading = true;
    this.articleLike = {
      articleId: this.id,
      isDelete: this.isDelete,
      userId: this.userId,
    };
    this.newsService$.setArticleLike(this.articleLike).subscribe(result => {
      this.getArticleLike();
      this.getAriticlelikes();
      this._notification.create(
        'success',
        '操作成功',
        ''
      );
    }, error1 => {
      this._notification.create(
        'error',
        '操作失败',
        `${error1.error}`
      );
    });
  }
  getNewContent(value: any) {
    this.getArticleLike();
    this.displayData = value;
    this.tagList = this.displayData.tagList;
  }
  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  navigate(id) {
    if (id == 1) {
      this.navigateByUrl('/client/newslaw');
    } else if (id == 2) {
      this.navigateByUrl('/client/newscase');
    } else {
      this.navigateByUrl('/client/newsnews');
    }
  }

  getHeart1() {
    this.isDelete = 0;
    this.setArticleLike();

  }

  getHeart0() {
    this.isDelete = 1;
    this.setArticleLike();

  }
}
