import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {NewsManagementService} from '../../../../service/news-management/news-management.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {NewsEditModalComponent} from '../../../../core/modal/news-edit-modal/news-edit-modal.component';




@Component({
  selector: 'app-news-management-table',
  templateUrl: './news-management-table.component.html',
  styleUrls: ['./news-management-table.component.less']
})
export class NewsManagementTableComponent implements OnInit {

  selectedProgramaValue: number = 0;
  selectedAttributeValue: number = 0;
  selectedStateValue: string = '';
  inputValue: string = '';

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  listOfProgramma = [];


  filterOptions = {
    searchPrograma: 0,
    searchParameter: '',
    searchAttribute: 0,
    searchState: '',
  };
  checkOption = [];

  // 全选功能
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};


  constructor(
    private newsManagementService$: NewsManagementService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getCategory();
    this.searchData();
    // let answers: string = '["0", "1"]';
    // console.log(JSON.parse(answers));
    // let jsonString = JSON.stringify(answers);
    // console.log(JSON.parse(jsonString)[0])
  }

  getCategory() {
    this.newsManagementService$.getCategoryList().subscribe(result => {
      this.listOfProgramma = result;
      this.listOfProgramma.push({id: 0, name: '全部栏目'})
    }, error1 => {
      this._notification.error(
        '发生错误！',
        '获取小组列表失败.'
      )
    })
  }

  // 新建资讯
  openCreateNewsModal() {
    const modal = this._modalService.create({
      nzTitle: '新建资讯',
      nzContent: NewsEditModalComponent,
      nzWidth: 600,
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.newsManagementService$.createNewNews(result.programa, result.body, result.isFeatured, result.isPromoted, result.isSticky, result.title, result.tag).subscribe(result => {
          this.searchData();
          this._notification.success(
            '创建成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

   // 搜索
  filterNews() {
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {  
      searchPrograma: this.selectedProgramaValue,
      searchParameter: this.inputValue,
      searchAttribute: this.selectedAttributeValue,
      searchState: this.selectedStateValue,
    };
    this.pageIndex = 1;
    this.newsManagementService$.getNewsList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.articleVoList;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfCheckedId[item.id] = false
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误！',
        `${error1.error}`)
    })
  }
  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.newsManagementService$.getNewsList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.articleVoList;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfCheckedId[item.id] = false
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.error(
        '发生错误！',
        `${error1.error}`)
    })
  }

  // 全选功能
  checkAll(value: boolean): void {
    this.displayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.displayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
  }
  operateData(): void {
    // 删除数据操作
    this.isOperating = true;
    let deleteList = [];
    this.displayData.forEach(item => {
      if (this.mapOfCheckedId[item.id])
        deleteList.push(item.id)
    });
    this.newsManagementService$.deleteAritcles(deleteList).subscribe(result => {
      this.isOperating = false;
      if (this.isAllDisplayDataChecked && this.pageIndex === this.totalPage) {
        this.pageIndex --;
      }
      this.searchData();
      this._notification.create(
        'success',
        '删除成功！',
        ''
      )
    }, error1 => {
      this.isOperating = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    })
  }

  setFeatured(id: string, data: any) {
    if (data) {
      this._modalService.confirm({
        nzTitle: '是否设置为头条？',
        nzOnOk: () => {
          this.newsManagementService$.updateFeatured(id, 1).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '设置成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    } else {
      this._modalService.confirm({
        nzTitle: '是否取消头条？',
        nzOnOk: () => {
          this.newsManagementService$.updateFeatured(id, 0).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '取消成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    }
  }

  setPromoted(id: string, data: any) {
    if (data) {
      this._modalService.confirm({
        nzTitle: '是否设为推荐？',
        nzOnOk: () => {
          this.newsManagementService$.updatePromoted(id, 1).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '设置成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    } else {
      this._modalService.confirm({
        nzTitle: '是否取消推荐？',
        nzOnOk: () => {
          this.newsManagementService$.updatePromoted(id, 0).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '取消成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    }
  }

  setSticky(id: string, data: any) {
    if (data) {
      this._modalService.confirm({
        nzTitle: '是否设为置顶？',
        nzOnOk: () => {
          this.newsManagementService$.updateSticky(id, 1).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '设置成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    } else {
      this._modalService.confirm({
        nzTitle: '是否取消置顶？',
        nzOnOk: () => {
          this.newsManagementService$.updateSticky(id, 0).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '取消成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    }
  }

  edit(item: any) {
    const modal = this._modalService.create({
      nzTitle: '修改资讯',
      nzContent: NewsEditModalComponent,
      nzComponentParams: {
        item: item
      },
      nzWidth: 600,
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.newsManagementService$.updateNews(item.id, result.programa, result.body, result.isFeatured, result.isPromoted, result.isSticky, result.title, result.tag).subscribe(result => {
          this.searchData();
          this._notification.success(
            '修改成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 发布资讯
  publishNews(id: string) {
    this._modalService.confirm({
      nzTitle: '是否要发布该条资讯？',
      nzOnOk: () => {
        this.newsManagementService$.postNews(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '发布成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 取消发布
  cancelNews(id: string) {
    this._modalService.confirm({
      nzTitle: '是否要将该条资讯取消发布？',
      nzOnOk: () => {
        this.newsManagementService$.cancelPostNews(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '取消发布成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 永久删除
  delete(id: string) {
    this._modalService.confirm({
      nzTitle: '是否要删除该条资讯？',
      nzOnOk: () => {
        let deleteList = [];
        deleteList.push(id);
        this.newsManagementService$.deleteAritcles(deleteList).subscribe(result => {
          if (this.displayData.length == 1) {
            this.pageIndex -- ;
          }
          this.searchData();
          this._notification.success(
            '删除成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 移至回收站
  recycleNews(id: string) {
    this._modalService.confirm({
      nzTitle: '是否要将该条资讯移入回收站？',
      nzOnOk: () => {
        this.newsManagementService$.recycleNews(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '移入回收站成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }


}
