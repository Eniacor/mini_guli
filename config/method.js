const api = require('./api.config.js');
const request = require('../common/request.js');
module.exports = {
    XcxUserInfo: (data) => request(api.XcxUserInfo, data, 'POST'), 
    UserRegister: (data) => request(api.UserRegister, data, 'POST'),
    BindPhone:(data) =>request(api.BindPhone,data,'POST'),
    UserInfo:(data) => request(api.UserInfo,data,'GET'),
    //考点
    TestPoint:(data) =>request(api.TestPoint,data,'GET'),
    //回忆
    Memory:(data) =>request(api.Memory,data,'POST'),
    MemoryIndex:(data) =>request(api.MemoryIndex,data,'GET'),
    MemoryMy:(data) =>request(api.MemoryMy,data,'POST'),
    MemoryLike:(data) =>request(api.MemoryLike,data,'POST'),
    MemoryCollect:(data) =>request(api.MemoryCollect,data,'POST'),
    MemoryDiscuz:(data) =>request(api.MemoryDiscuz,data,'POST'),
    MemoryDLike:(data) =>request(api.MemoryDLike,data,'POST'),  
    MemoryItem:(data) =>request(api.MemoryItem,data,'GET'),
    Rowner:(data)=>request(api.Rowner,data,'GET'),
    //题目
    QuestionType:(data) =>request(api.QuestionType,data,'GET'),
    QuestionIndex:(data) =>request(api.QuestionIndex,data,'GET'),
    QuestionShow:(data) =>request(api.QuestionShow,data,'GET'),
    QuestionConfirm:(data) =>request(api.QuestionConfirm,data,'POST'),
    QuestionCollect:(data) =>request(api.QuestionCollect,data,'POST'),
    QuestionDiscuz:(data) =>request(api.QuestionDiscuz,data,'POST'),
    QuestionDiscuzLike:(data) =>request(api.QuestionDiscuzLike,data,'POST'),
    QuestionPrev:(data) =>request(api.QuestionPrev,data,'GET'),
    QuestionNext:(data) =>request(api.QuestionNext,data,'GET'),
    QuestionRecord:(data) =>request(api.QuestionRecord,data,'POST'),
    QuestionRemark:(data) =>request(api.QuestionRemark,data,'POST'),
    QuestionExerciseLike:(data) =>request(api.QuestionExerciseLike,data,'POST'),
    QuestionExerciseStore:(data) =>request(api.QuestionExerciseStore,data,'POST'),
    QuestionExerciseShow:(data) =>request(api.QuestionExerciseShow,data,'GET'),
    QuestionExerciseRemark:(data) =>request(api.QuestionExerciseRemark,data,'POST'),
    QuestionMyWord:(data) =>request(api.QuestionMyWord,data,'GET'),
    QuestionNewWord:(data) =>request(api.QuestionNewWord,data,'POST'),
    //老师
    FamousIndex:(data) =>request(api.FamousIndex,data,'GET'),
    FamousShow:(data) =>request(api.FamousShow,data,'POST'),
    ReserveConsult:(data) =>request(api.ReserveConsult,data,'POST'),
    ReserveConsultImg:(data) =>request(api.ReserveConsultImg,data,'POST'),
    ReserveReport:(data) =>request(api.ReserveReport,data,'POST'),
    ReserveReportImg:(data) =>request(api.ReserveReportImg,data,'POST'),
    //高分榜
    HighScoreIndex:(data) =>request(api.HighScoreIndex,data,'GET'),
    HighScoreIndexh:(data) =>request(api.HighScoreIndexh,data,'GET'),
    HighScoreShow:(data) =>request(api.HighScoreShow,data,'POST'),
    //练习
    PracticeList:(data)=>request(api.PracticeList,data,'GET'),
    PracticeDetail:(data)=>request(api.PracticeDetail,data,'GET'),
    PracticeTask:(data)=>request(api.PracticeTask,data,'GET'),
    PracticeCollect:(data)=>request(api.PracticeCollect,data,'POST'),
    PracticeMyCollect:(data)=>request(api.PracticeMyCollect,data,'GET'),
    //文章
    Article:(data)=>request(api.Article,data,'GET'),
    ArticleShow:(data)=>request(api.ArticleShow,data,'GET'),
    ArticleCollect:(data)=>request(api.ArticleCollect,data,'POST'),
    ArticleMyCollect:(data)=>request(api.ArticleMyCollect,data,'POST'),
    //活动
    Course:(data)=>request(api.Course,data,'GET'),
    CourseShow:(data)=>request(api.CourseShow,data,'GET'),
    ActivityShow:(data)=>request(api.ActivityShow,data,'GET'),
    Activity:(data)=>request(api.Activity,data,'GET'),
    //用户中心
    HasSign:(data)=>request(api.HasSign,data,'POST'),
    Sign:(data)=>request(api.Sign,data,'POST'),
    Modified:(data)=>request(api.Modified,data,'POST'),
    //商品
    Good:(data)=>request(api.Good,data,'GET'),
    Rgood:(data)=>request(api.Rgood,data,'GET'),
    Gshow:(data)=>request(api.Gshow,data,'GET'),
    Igood:(data)=>request(api.Igood,data,'GET'),
    Irgood:(data)=>request(api.Irgood,data,'GET'),
    Ishow:(data)=>request(api.Ishow,data,'GET'),
    //收藏
    ActivityCollect:(data)=>request(api.ActivityCollect,data,'POST'),
    ActivityMyCollect:(data)=>request(api.ActivityMyCollect,data,'GET'),
    CourseCollect:(data)=>request(api.CourseCollect,data,'POST'),
    CourseMyCollect:(data)=>request(api.CourseMyCollect,data,'GET'),
    //积分
    IntegralOrder:(data)=>request(api.IntegralOrder,data,'POST'),
    IntegralOwner:(data)=>request(api.IntegralOwner,data,'GET'),
    IntegralOshow:(data)=>request(api.IntegralOshow,data,'GET'),
    GoodsOrder:(data)=>request(api.GoodsOrder,data,'GET'),
    GoodsOrders:(data)=>request(api.GoodsOrders,data,'GET'),
    //vip
    VipMember:(data)=>request(api.VipMember,data,'GET'),
    VipExport:(data)=>request(api.VipExport,data,'POST'),
    VipExchange:(data)=>request(api.VipExchange,data,'POST'),
    VipHasMember:(data)=>request(api.VipHasMember,data,'POST'),
    Banner:(data)=>request(api.Banner,data,'POST'),
    Fbanner:(data)=>request(api.Fbanner,data,'GET'),
    Apply:(data)=>request(api.Apply,data,'POST'),

    PHCollect:(data)=>request(api.PHCollect,data,'POST'),
    MHCollect:(data)=>request(api.MHCollect,data,'POST'),
    MHLike:(data)=>request(api.MHLike,data,'POST'),
    MSearch:(data)=>request(api.MSearch,data,'GET'),
    QHCollect:(data)=>request(api.QHCollect,data,'POST'),
    QSearch:(data)=>request(api.QSearch,data,'POST'),
    MQCollect:(data) =>request(api.MQCollect,data,'POST'),
    HCArticle:(data) =>request(api.HCArticle,data,'POST'),
    
    HACollect:(data) =>request(api.HACollect,data,'POST'),
    HCCollect:(data) =>request(api.HCCollect,data,'POST'),
    VipText:(data) =>request(api.VipText,data,'POST'),
    
    NewWordD:(data) =>request(api.NewWordD,data,'POST'),
    NewWordP:(data) =>request(api.NewWordP,data,'GET'),
    NewWordN:(data) =>request(api.NewWordN,data,'GET'),
}