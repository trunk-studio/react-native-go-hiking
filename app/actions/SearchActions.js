export const RECEIVED_SEARCH_NEWS = 'RECEIVED_SEARCH_NEWS';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';

function receivedSearchNews(newsList) {
  return {
    type: RECEIVED_SEARCH_NEWS,
    data: newsList,
  };
}

function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList,
  };
}

export async function requestNews() {
  const newsList = [{ title: '天天五蔬果營養課程活動', content: '宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '天天五蔬果營養課程活動', content: '宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '好康大放送！食安守門站運動焦點活動', content: '農委會致力打造安全、安心的農產品供應鏈，宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '天天五蔬果營養課程活動', content: '宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '好康大放送！食安守門站運動焦點活動', content: '農委會致力打造安全、安心的農產品供應鏈，宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '天天五蔬果營養課程活動', content: '宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '好康大放送！食安守門站運動焦點活動', content: '農委會致力打造安全、安心的農產品供應鏈，宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '天天五蔬果營養課程活動', content: '宣導健康飲食原則養成天天攝取五蔬果的習慣' },
    { title: '好康大放送！食安守門站運動焦點活動', content: '農委會致力打造安全、安心的農產品供應鏈，宣導健康飲食原則養成天天攝取五蔬果的習慣' },
  ];

  return (dispatch) => {
    dispatch(receivedSearchNews(newsList));
  };
}

export async function requestSearchPost(mIndex) {
  let listData;
  const m1 = require('../json/month/1.json');
  const m2 = require('../json/month/2.json');
  const m3 = require('../json/month/3.json');
  const m4 = require('../json/month/4.json');
  const m5 = require('../json/month/5.json');
  const m6 = require('../json/month/6.json');
  const m7 = require('../json/month/7.json');
  const m8 = require('../json/month/8.json');
  const m9 = require('../json/month/9.json');
  const m10 = require('../json/month/10.json');
  const m11 = require('../json/month/11.json');
  const m12 = require('../json/month/12.json');

  switch (mIndex) {
    case 1:
      listData = m1;
      break;
    case 2:
      listData = m2;
      break;
    case 3:
      listData = m3;
      break;
    case 4:
      listData = m4;
      break;
    case 5:
      listData = m5;
      break;
    case 6:
      listData = m6;
      break;
    case 7:
      listData = m7;
      break;
    case 8:
      listData = m8;
      break;
    case 9:
      listData = m9;
      break;
    case 10:
      listData = m10;
      break;
    case 11:
      listData = m11;
      break;
    default:
      listData = m12;
      break;
  }
  // const paramArray = [];
  // if (location) {
  //   paramArray.push(`lat=${location.lat}`);
  //   paramArray.push(`lon=${location.lon}`);
  // }
  // if (distance) {
  //   paramArray.push(`distance=${distance}`);
  // }
  // const param = paramArray.join('&');
  // const searchApi = `http://localhost:1337/rest/post/search/${keyword}?${param}`;
  // const postList = await fetch(searchApi).then(response => response.json());
  // const searchApi = `http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061&$top=10&$filter=month+like+${mIndex}`;
  // const postList = await fetch(searchApi).then(response => response.json());
  return (dispatch) => {
    dispatch(receivedSearchPost(listData));
  };
}
