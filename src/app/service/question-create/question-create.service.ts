import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionCreateService {

  constructor(private _http: HttpClient) { }

  getQuestionNum(courseSetId: number): Observable<any> {
    const api = `/course/getQuestionNum?courseSetId=${courseSetId}`
    return this._http.get(api);
  }
  getCourseQuestionList(courseId: any, pageNum: number = 1, pageSize: number = 10, keyWord: any = '', type: string = ''): Observable<any> {
    const api = '/course/getCourseQuestionList';
    let httpParams = new HttpParams()
      .set('courseSetId', courseId)
      .set('keyWord', keyWord)
      .set('pageNum', `${pageNum}`)
      .set('pageSize', `${pageSize}`)
      .set('type', type)

    return this._http.get(api, { params: httpParams });
  }
  getQuestionInfo(questionId: number): Observable<any> {
    const api = `/course/getQuestionInfo?questionId=${questionId}`
    return this._http.get(api);
  }
  createQuestion(config: any): Observable<any> {
    const api = "/course/createQuestion";
    return this._http.post(api, config);
  }

  editQuestion(config: any): Observable<any> {
    const api = "/course/editQuestion";
    return this._http.put(api, config)
  }

  deleteQuestion(questionId: number): Observable<any> {
    const api = `/course/deleteQuestion?questionId=${questionId}`
    return this._http.delete(api);
  }

  deleteQuestionList(questionIds: any) {
    let api = `/course/deleteQuestionList?questionIds=${questionIds}`;
    return this._http.delete(api)
  }

  //选项的转化
  strToUnicode(data: string = '汉字'):string {
    if (data === '') return '';
    let str = '';
    for (let i = 0; i < data.length; i++) {
      str += "\\u" + parseInt(data[i].charCodeAt(0).toString(), 10).toString(16);
    }
    return str;
  }

  //匹配p标签中的信息
  extractBetweenTagP(value: string): string {
    if (value) {
      const pattern = /<p>((\w|\W)*?)<\/p>/;
      return value.match(pattern) == null ? '' : value.match(pattern)[1];
    } else {
      return '';
    }
  }

  //内容两端添加上p标签
  makeWarpedByTagP(value: string): string {
    return value == '' ? '' : `<p>${value}<\/p>\r\n`;
  }

  getMeta(value: string): string {
    return this.makeWarpedByTagP(this.strToUnicode(this.extractBetweenTagP(value)));
  }

  //获取控件的uuid
  getId() {
    return Number(Math.random().toString().substr(3, 18) + Date.now()).toString(36);
  }

  createPaper(paperInfo: any): Observable<any> {
    return this._http.post(`/course/addTestPaper`, {
      choiceCount: paperInfo.choiceCount,
      choiceMissScore: paperInfo.choiceMissScore,
      choiceScore: paperInfo.choiceScore,
      courseSetId: paperInfo.courseSetId,
      createUserId: paperInfo.createUserId,
      description: paperInfo.description,
      determineCount: paperInfo.determineCount,
      determineScore: paperInfo.determineScore,
      difficultyPercentage: paperInfo.difficultyPercentage,
      itemCount: paperInfo.itemCount,
      mode: paperInfo.mode,
      normalPercentage: paperInfo.normalPercentage,
      simplePercentage: paperInfo.simplePercentage,
      singleChoiceCount: paperInfo.singleChoiceCount,
      singleChoiceScore: paperInfo.singleChoiceScore,
      testPaperName: paperInfo.testPaperName,
      uncertainChoiceCount: paperInfo.uncertainChoiceCount,
      uncertainChoiceMissScore: paperInfo.uncertainChoiceMissScore,
      uncertainChoiceScore: paperInfo.uncertainChoiceScore
    })
  }

  getExamQuestionList(testId: string): Observable<any> {
    return this._http.get(`/course/getTestPaperCreateQuestionView?testId=${testId}`)
  }

  getExamListByCourseId(courseSetId: string, pageIndex: number=0, pageSize: number=0): Observable<any> {
    return this._http.get(`/course/getTestPaperViewList?courseSetId=${courseSetId}`)
  }

  openTestPaper(id: string): Observable<any> {
    return this._http.put(`/course/openTestPaper?testId=${id}`, {})
  }

  deleteTestPaper(id: string): Observable<any> {
    return this._http.delete(`/course/deleteTestPaper?testId=${id}`)
  }

  deleteTestPaperList(idList: any): Observable<any> {
    return this._http.delete(`/course/deleteTestPaperList?list=${idList}`)
  }

  closeTestPaper(id: string): Observable<any> {
    return this._http.put(`/course/closeTestPaper?testId=${id}`, {})
  }

  viewPaperQuestionEdit(id: string): Observable<any> {
    return this._http.get(`/course/getTestPaperCreateQuestionView?testId=${id}`)
  }

  showPaperInfoEdit(id: string): Observable<any> {
    return this._http.get(`/course/getEditorTestPaper?testId=${id}`)
  }

  editPaperInfo(id: string, name: string, description: string): Observable<any> {
    return this._http.post(`/course/editorTestPaper`, {
      description: description,
      id: id,
      name: name
    })
  }

  getQuestionDetail(questionId:number): Observable<any> {

    return this._http.get(`/user/getQuestionDetail?questionId=${questionId}`)
  }

  getAddQuestionList(courseSetId: string, excludeIds: any, pageNum: number, pageSize: number, questionType: string): Observable<any> {
    return this._http.get(`/course/getAddQuestionList?courseSetId=${courseSetId}&excludeIds=${excludeIds}&questionType=${questionType}&pageNum=${pageNum}&pageSize=${pageSize}`)
  }

  searchQuestion(pageNum: number, pageSize: number, courseSetId: string, excludeIds: any, searchKey: string, questionType: string): Observable<any> {
    return this._http.post(`/course/searchQuestion?pageNum=${pageNum}&pageSize=${pageSize}`, {
      courseSetId: courseSetId,
      excludeIds: excludeIds,
      searchKey: searchKey,
      questionType: questionType
    })
  }

  storePaper(itemCount: number, passedCondition: number, score: number, testId: string, testPaperItemList: any, userId: number): Observable<any> {
    return this._http.put(`/course/updateQuestion`, {
      itemCount: itemCount,
      passedCondition: passedCondition,
      score: score,
      testId: testId,
      testPaperItemList: testPaperItemList,
      userId: userId
    })
  }


}
