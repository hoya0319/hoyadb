function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}
let today = new Date();
hours = today.getHours();
hours = hours - 1;
hours = String(hours);
// console.log(hours);
if (hours.length == 1) {
    hours = "0" + hours + "00"
} else {
    hours = hours + "00"
}

blabla = today.getTime();
if (blabla <6&&blabla>=18){
    blabla = '1800'
}else{
    blabla = '0600'
}
var now_chart = new Chart(document.getElementById("now_weather_Chart"), {
    type: 'bar',
    data: {
        labels: ["최저기온", "현재기온", "최고기온"],
        datasets: [
            {
                label: "℃ ",
                backgroundColor: ["rgb(44, 165, 203)", "#FFFF99", "rgb(219, 69, 73)"],
                data: [0, 0, 0]
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: { display: false },
        title: {
            display: false,
            text: '기온'
        }
    }
});

$(function () {
    areaSelectMaker("select[name=addressRegion]");
});

var main;

var areaSelectMaker = function (target) {
    if (target == null || $(target).length == 0) {
        console.warn("Unkwon Area Tag");
        return;
    }

    var area = {
        "수도권": {
            "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
            "경기도": ["수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
            "인천광역시": ["계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군 백령면", "옹진군 연평면", '옹진군']
        },
        "강원권": {
            "강원도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"]
        },
        "충청권": {
            "충청북도": ["청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
            "충청남도": ["천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
            "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
            "세종특별자치시": ["세종특별자치시"]
        },
        "전라권": {
            "전라북도": ["전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
            "전라남도": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
            "광주광역시": ["광산구", "남구", "동구", "북구", "서구"]
        },
        "경상권": {
            "경상북도": ["포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군", "독도"],
            "경상남도": ["창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
            "부산광역시": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
            "대구광역시": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
            "울산광역시": ["남구", "동구", "북구", "중구", "울주군"]
        },
        "제주권": {
            "제주특별자치도": ["서귀포시", "제주시", "이어도"]
        }
    };

    for (i = 0; i < $(target).length; i++) {
        (function (z) {
            var a1 = $(target).eq(z);
            var a2 = a1.next();
            var a3 = a2.next();

            //초기화
            init(a1, true);

            //권역 기본 생성
            var areaKeys1 = Object.keys(area);
            areaKeys1.forEach(function (Region) {
                a1.append("<option value=" + Region + ">" + Region + "</option>");
            });

            //변경 이벤트
            $(a1).on("change", function () {
                init($(this), false);
                var Region = $(this).val();
                var keys = Object.keys(area[Region]);
                keys.forEach(function (Do) {
                    a2.append("<option value=" + Do + ">" + Do + "</option>");
                });
            });

            $(a2).on("change", function () {
                a3.empty().append("<option value=''>선택</option>");
                var Region = a1.val();
                var Do = $(this).val();
                var keys = Object.keys(area[Region][Do]);
                keys.forEach(function (SiGunGu) {
                    a3.append("<option value='" + area[Region][Do][SiGunGu] + "'>" + area[Region][Do][SiGunGu] + "</option>");
                });
            });
        })(i);

        function init(t, first) {
            first ? t.empty().append("<option value=''>선택</option>") : "";
            t.next().empty().append("<option value=''>선택</option>");
            t.next().next().empty().append("<option value=''>선택</option>");
        }
    }
}
document.getElementById('confirm_btn').addEventListener("click", function () {
    // document.getElementById('weather').style.display ='block'
    // document.getElementById('now_weather_Chart').style.display ='block'
    // console.log(document.getElementById('addressRegion1').value);
    // console.log(document.getElementById('addressDo1').value);
    // console.log(document.getElementById('addressSiGunGu1').value);
    document.getElementById('location').textContent = `${document.getElementById('addressDo1').value} ${document.getElementById('addressSiGunGu1').value}의 날씨`;

    //주소 -> 좌표
    var x = 0;
    var y = 0;
    var area_code = 0
    var yuksang
    var address = document.getElementById('addressSiGunGu1').value;
    if (document.getElementById('addressDo1').value == '서울특별시') {
        area_code = 109
        yuksang = '11B00000'
        ma = '11B10101'
        switch (address) {
            case '종로구':
            case '중구':
                x = 60;
                y = 127;
                break;
            case '용산구':
                x = 60;
                y = 126;
                break;
            case '성동구':
            case '동대문구':
                x = 61;
                y = 127;
                break;
            case '광진구':
                x = 62;
                y = 126;
                break;
            case '중랑구':
                x = 62;
                y = 128;
                break;
            case '성북구':
            case '강북구':
                x = 61;
                y = 128;
                break;
            case '도봉구':
            case '노원구':
                x = 61;
                y = 129;
                break;
            case '은평구':
                x = 59;
                y = 127;
                break;
            case '서대문구':
                x = 59;
                y = 127;
                break;
            case '마포구':
                x = 59;
                y = 126;
                break;
            case '양천구':
                x = 58;
                y = 126;
                break;
            case '강서구':
                x = 57;
                y = 127;
                break;
            case '구로구':
                x = 58;
                y = 125;
                break;
            case '금천구':
                x = 58;
                y = 124;
                break;
            case '영등포구':
                x = 59;
                y = 126;
                break;
            case '동작구':
            case '관악구':
                x = 59;
                y = 125;
                break;
            case '서초구':
                x = 60;
                y = 125;
                break;
            case '강남구':
                x = 61;
                y = 125;
                break;
            case '송파구':
                x = 62;
                y = 125;
                break;
            case '강동구':
                x = 62;
                y = 126;
                break;
            default:
                x = 60;
                y = 127;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '부산광역시') {
        area_code = 159
        ma = '11H20201' 
        yuksang=  '11H20000'
        switch (address) {
            case '중구':
            case '서구':
                x = 97;
                y = 74;
                break;
            case '동구':
                x = 97;
                y = 75;
                break;
            case '영도구':
                x = 98;
                y = 74;
                break;
            case '부산진구':
                x = 97;
                y = 75;
                break;
            case '동래구':
                x = 98;
                y = 77;
                break;
            case '남구':
                x = 98;
                y = 75;
                break;
            case '북구':
                x = 97;
                y = 76;
                break;
            case '해운대구':
                x = 99;
                y = 76;
                break;
            case '사하구':
                x = 96;
                y = 73;
                break;
            case '금정구':
                x = 98;
                y = 77;
                break;
            case '강서구':
                x = 95;
                y = 74;
                break;
            case '연제구':
                x = 98;
                y = 76;
                break;
            case '수영구':
                x = 99;
                y = 75;
                break;
            case '사상구':
                x = 97;
                y = 75;
                break;
            case '기장군':
                x = 100;
                y = 78;
                break;
            default:
                x = 98;
                y = 76;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '대구광역시') {
        area_code = 143
        ma = '11H10701'
        yuksang = '11H10000'
        switch (address) {
            case '중구':
                x = 89;
                y = 90;
                break;
            case '동구':
                x = 90;
                y = 91;
                break;
            case '서구':
                x = 88;
                y = 90;
                break;
            case '남구':
            case '수성구':
                x = 89;
                y = 90;
                break;
            case '북구':
                x = 90;
                y = 91;
                break;
            case '달서구':
                x = 87;
                y = 90;
                break;
            case '달성군':
                x = 88;
                y = 88;
                break;
            default:
                x = 89;
                y = 90;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '인천광역시') {
        area_code = 109
        yuksang = '11B00000'
        ma = '11B20101'
        switch (address) {
            case '중구':
                x = 53;
                y = 125;
                break;
            case '동구':
                x = 54;
                y = 125;
                break;
            case '미추홀구':
                x = 55;
                y = 124;
                break;
            case '연수구':
                x = 55;
                y = 123;
                break;
            case '남동구':
                x = 56;
                y = 124;
                break;
            case '부평구':
                x = 55;
                y = 125;
                break;
            case '계양구':
                x = 56;
                y = 126;
                break;
            case '서구':
                x = 55;
                y = 125;
                break;
            case '강화군':
                ma = '11B20102'
                x = 50;
                y = 130;
                break;
            case '옹진군':
                x = 50;
                y = 120;
                break;
            case '옹진군 연평면':
                x = 38;
                y = 129;
                break;
            case '옹진군 백령면':
                ma = '11A00101'
                x = 21;
                y = 135;
                break;
            default:
                x = 55;
                y = 124;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '광주광역시') {
        ma = '11F20501'
        area_code = 156
        yuksang = '11F20000'
        switch (address) {
            case '동구':
                x = 60;
                y = 74;
                break;
            case '서구':
                x = 59
                y = 74;
                break;
            case '남구':
                x = 59;
                y = 73;
                break;
            case '북구':
                x = 59;
                y = 75;
                break;
            case '광산구':
                x = 58;
                y = 75;
                break;
            default:
                x = 58;
                y = 74;
        }
    } else if (document.getElementById('addressDo1').value == '대전광역시') {
        area_code = 133
        ma = '11C20401'
        yuksang = '11C20000'
        switch (address) {
            case '동구':
                x = 68;
                y = 100;
                break;
            case '중구':
            case '서구':
                x = 67;
                y = 100;
                break;
            case '유성구':
                x = 66;
                y = 101;
                break;
            case '대덕구':
                x = 68;
                y = 101;
                break;
            default:
                x = 67;
                y = 100;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '울산광역시') {
        yuksang=  '11H20000'
        ma = '11H20101'
        area_code = 159
        switch (address) {
            case '중구':
                x = 102;
                y = 84;
                break;
            case '남구':
                x = 101;
                y = 84;
                break;
            case '동구':
                x = 104;
                y = 83;
                break;
            case '북구':
                x = 103;
                y = 85;
                break;
            case '울주군':
                x = 100;
                y = 85;
                break;
            case '삼척시':
                ma = '11D20602'
                x=98;
                y=125;
                yuksang ='11D20000' 
            default:
                x = 102;
                y = 84;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '세종특별자치시') {
        area_code = 133
        ma = '11C20404'
        yuksang = '11C20000'
        switch (address) {
            case '세종특별자치시':
                x = 65;
                y = 105;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '경기도') {
        area_code = 109
        yuksang = '11B00000'
        switch (address) {
            case '수원시 장안구':
                ma = '11B20601'
                x = 60;
                y = 121;
                break;
            case '수원시 권선구':
                ma = '11B20601'
                x = 60;
                y = 120;
                break;
            case '수원시 팔달구':
                ma = '11B20601'
                x = 61;
                y = 120;
                break;
            case '수원시 영통구':
                ma = '11B20601'
                x = 62;
                y = 120;
                break;
            case '성남시 수정구':
            case '성남시 중원구':
                ma = '11B20605'
                x = 63;
                y = 124;
                break;
            case '성남시 분당구':
                ma = '11B20605'
                x = 62;
                y = 123;
                break;
            case '의정부시':
                ma = '11B20301'
                x = 61;
                y = 131;
                break;
            case '안양시 만안구':
                ma = '11B20602'
                x = 59;
                y = 123;
                break;
            case '안양시 동안구':
                ma = '11B20602'
                x = 60;
                y = 123;
                break;
            case '부천시':
                ma = '11B20203'
                x = 57;
                y = 125;
                break;
            case '광명시':
                ma = '11B10103'
                x = 58;
                y = 125;
                break;
            case '평택시':
                ma = '11B20606'
                x = 62;
                y = 114;
                break;
            case '동두천시':
                ma = '11B20401'
                x = 61;
                y = 134;
                break;
            case '안산시 상록구':
                ma = '11B20203'
                x = 58;
                y = 121;
                break;
            case '안산시 단원구':
                ma = '11B20203'
                x = 57;
                y = 121;
                break;
            case '고양시 덕양구':
                ma = '11B20302'
                x = 57;
                y = 128;
                break;
            case '고양시 일산동구':
                ma = '11B20302'
                x = 56;
                y = 129;
                break;
            case '고양시 일산서구':
                ma = '11B20302'
                x = 56;
                y = 129;
                break;
            case '과천시':
                ma = '11B10102'
                x = 60;
                y = 124;
                break;
            case '구리시':
                ma = '11B20501'
                x = 62;
                y = 127;
                break;
            case '남양주시':
                ma = '11B20502'
                x = 64;
                y = 128;
                break;
            case '오산시':
                ma = '11B20602'
                x = 62;
                y = 118;
                break;
            case '시흥시':
                ma = '11B20202'
                x = 57;
                y = 123;
                break;
            case '군포시':
                ma = '11B20610'
                x = 59;
                y = 122;
                break;
            case '의왕시':
                ma = '11B20609'
                x = 60;
                y = 122;
                break;
            case '하남시':
                ma = '11B20504'
                x = 64;
                y = 126;
                break;
            case '용인시 처인구':
                ma = '11B20612'
                x = 64;
                y = 119;
                break;
            case '용인시 기흥구':
                ma = '11B20612'
                x = 62;
                y = 120;
                break;
            case '용인시 수지구':
                ma = '11B20612'
                x = 62;
                y = 121;
                break;
            case '파주시':
                ma = '11B20305'
                x = 56;
                y = 131;
                break;
            case '이천시':
                ma = '11B20701'
                x = 68;
                y = 121;
                break;
            case '안성시':
                ma = '11B20611'
                x = 65;
                y = 115;
                break;
            case '김포시':
                ma = '11B20102'
                x = 55;
                y = 128;
                break;
            case '화성시':
                ma = '11B20604'
                x = 57;
                y = 119;
                break;
            case '광주시':
                ma = '11B20702'
                x = 65;
                y = 123;
                break;
            case '양주시':
                ma = '11B20304'
                x = 61;
                y = 131;
                break;
            case '포천시':
                ma = '11B20404'
                x = 64;
                y = 134;
                break;
            case '여주시':
                ma = '11B20703'
                x = 71;
                y = 121;
                break;
            case '연천군':
                ma = '11B20402'
                x = 61;
                y = 138;
                break;
            case '가평군':
                x = 69;
                y = 133;
                break;
            case '양평군':
                ma = '11B20503'
                x = 69;
                y = 125;
                break;
            default:
                x = 60;
                y = 120;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '강원도') {
        area_code = 105
        yuksang='11D10000'
        switch (address) {
            case '춘천시':
                ma = '11D10301'
                x = 73;
                y = 134;
                break;
            case '원주시':
                ma = '11D10401'
                x = 76;
                y = 122;
                break;
            case '강릉시':
                ma = '11D20501'
                yuksang ='11D20000'
                x = 92;
                y = 131;
                break;
            case '동해시':
                ma = '11D20601'
                yuksang ='11D20000'
                x = 97;
                y = 127;
                break;
            case '태백시':
                ma = '11D20301'
                yuksang ='11D20000'
                x = 95;
                y = 119;
                break;
            case '속초시':
                ma = '11D20401'
                x = 87;
                y = 141;
                yuksang ='11D20000'
                break;
            case '홍천군':
                ma = '11D10302'
                x = 75;
                y = 130;
                break;
            case '횡성군':
                ma = '11D10402'
                x = 77;
                y = 125;
                break;
            case '영월군':
                ma = '11D10501'
                x = 86;
                y = 119;
                break;
            case '평창군':
                ma = '11D10503'
                x = 84;
                y = 123;
                break;
            case '정선군':
                ma = '11D10502'
                x = 89;
                y = 123;
                break;
            case '철원군':
                ma = '11D10101'
                x = 65;
                y = 139;
                break;
            case '화천군':
                ma = '11D10102'
                x = 72;
                y = 139;
                break;
            case '양구군':
                ma = '11D10202'
                x = 77;
                y = 139;
                break;
            case '인제군':
                ma = '11D10201'
                x = 80;
                y = 138;
                break;
            case '고성군':
                ma = '11D20402'
                x = 85;
                y = 145;
                yuksang ='11D20000'
                break;
            case '양양군':
                ma = '11D20403'
                yuksang ='11D20000'
                x = 88;
                y = 138;
                break;
            default:
                x = 73;
                y = 134;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '충청북도') {
        area_code = 131
        yuksang = '11C10000'
        switch (address) {
            case '청주시 상당구':
                ma = '11C10301'
                x = 69;
                y = 106;
                break;
            case '청주시 서원구':
                ma = '11C10301'
                x = 69;
                y = 107;
                break;
            case '청주시 흥덕구':
                ma = '11C10301'
                x = 67;
                y = 106;
                break;
            case '청주시 청원구':
                ma = '11C10301'
                x = 69;
                y = 107;
                break;
            case '충주시':
                ma = '11C10101'
                x = 76;
                y = 114;
                break;
            case '제천시':
                ma = '11C10201'
                x = 81;
                y = 118;
                break;
            case '보은군':
                ma = '11C10302'
                x = 73;
                y = 103;
                break;
            case '옥천군':
                ma = '11C10403'
                x = 71;
                y = 99;
                break;
            case '영동군':
                ma = '11C10402'
                x = 74;
                y = 97;
                break;
            case '증평군':
                ma = '11C10304'
                x = 71;
                y = 110;
                break;
            case '진천군':
                ma = '11C10102'
                x = 68;
                y = 111;
                break;
            case '괴산군':
                ma = '11C10303'
                x = 74;
                y = 111;
                break;
            case '음성군':
                ma = '11C10103'
                x = 72;
                y = 113;
                break;
            case '단양군':
                ma = '11C10202'
                x = 84;
                y = 115;
                break;
            default:
                x = 69;
                y = 107;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '충청남도') {
        area_code = 133
        yuksang = '11C20000'
        switch (address) {
            case '천안시 동남구':
                ma = '11C20301'
                x = 63;
                y = 110;
                break;
            case '천안시 서북구':
                ma = '11C20301'
                x = 63;
                y = 112;
                break;
            case '공주시':
                ma = '11C20402'
                x = 63;
                y = 102;
                break;
            case '보령시':
                ma = '11C20201'
                x = 54;
                y = 100;
                break;
            case '아산시':
                ma = '11C20302'
                x = 60;
                y = 110;
                break;
            case '서산시':
                ma = '11C20101'
                x = 51;
                y = 110;
                break;
            case '논산시':
                ma = '11C20602'
                x = 62;
                y = 97;
                break;
            case '계룡시':
                ma = '11C20403'
                x = 65;
                y = 99;
                break;
            case '당진시':
                ma = '11C20103'
                x = 54;
                y = 112;
                break;
            case '금산군':
                ma = '11C20601'
                x = 69;
                y = 95;
                break;
            case '부여군':
                ma = '11C20501'
                x = 59;
                y = 99;
                break;
            case '서천군':
                ma = '11C20202'
                x = 55;
                y = 94;
                break;
            case '청양군':
                ma = '11C20502'
                x = 57;
                y = 103;
                break;
            case '홍성군':
                ma = '11C20104'
                x = 55;
                y = 106;
                break;
            case '예산군':
                ma = '11C20303'
                x = 58;
                y = 107;
                break;
            case '태안군':
                ma = '11C20102'
                x = 48;
                y = 109;
                break;
            default:
                x = 68;
                y = 100;
        }
    } else if (document.getElementById('addressDo1').value == '전라북도') {
        yuksang = '11F10000'
        area_code = 146
        switch (address) {
            case '전주시 완산구':
                ma = '11F10201'
                x = 63;
                y = 89;
                break;
            case '전주시 덕진구':
                ma = '11F10201'
                x = 63;
                y = 89;
                break;
            case '군산시':
                ma = '11F10501'
                x = 56;
                y = 92;
                break;
            case '익산시':
                ma = '11F10202'
                x = 60;
                y = 91;
                break;
            case '정읍시':
                ma = '11F10203'
                x = 58;
                y = 83;
                break;
            case '남원시':
                ma = '11F10401'
                x = 68;
                y = 80;
                break;
            case '김제시':
                ma = '11F10501'
                x = 59;
                y = 88;
                break;
            case '완주군':
                ma = '11F10204'
                x = 63;
                y = 89;
                break;
            case '진안군':
                ma = '11F10303'
                x = 68;
                y = 88;
                break;
            case '무주군':
                ma = '11F10302'
                x = 72;                
                y = 93;
                break;
            case '장수군':
                ma = '11F10301'
                x = 70;
                y = 85;
                break;
            case '임실군':
                ma = '11F10402'
                x = 66;
                y = 84;
                break;
            case '순창군':
                ma = '11F10403'
                x = 63;
                y = 79;
                break;
            case '고창군':
                ma = '11F10601'
                x = 56;
                y = 80;
                break;
            case '부안군':
                ma = '11F10602'
                x = 56;
                y = 87;
                break;
            default:
                x = 63;
                y = 89;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '전라남도') {
        yuksang = '11F20000'
        area_code = 156
        switch (address) {
            case '목포시':
                ma = '11F20801'
                x = 50;
                y = 67;
                break;
            case '여수시':
                ma = '11F20401'
                x = 73;
                y = 66;
                break;
            case '순천시':
                ma = '11F20405'
                x = 70;
                y = 70;
                break;
            case '나주시':
                ma = '11F20503'
                x = 56;
                y = 71;
                break;
            case '광양시':
                ma = '11F20402'
                x = 73;
                y = 70;
                break;
            case '담양군':
                ma = '11F20504'
                x = 61;
                y = 78;
                break;
            case '곡성군':
                ma = '11F20602'
                x = 66;
                y = 77;
                break;
            case '구례군':
                ma = '11F20601'
                x = 69;
                y = 75;
                break;
            case '고흥군':
                ma = '11F20403'
                x = 66;
                y = 62;
                break;
            case '보성군':
                ma = '11F20404'
                x = 62;
                y = 66;
                break;
            case '화순군':
                ma = '11F20505'
                x = 61;
                y = 72;
                break;
            case '장흥군':
                ma = '11F20304'
                x = 59;
                y = 64;
                break;
            case '강진군':
                ma = '11F20303'
                x = 57;
                y = 63;
                break;
            case '해남군':
                ma = '11F20302'
                x = 54;
                y = 61;
                break;
            case '영암군':
                ma = '11F20802'
                x = 56;
                y = 66;
                break;
            case '무안군':
                ma = '11F20804'
                x = 52;
                y = 71;
                break;
            case '함평군':
                ma = '11F20101'
                x = 52;
                y = 72;
                break;
            case '영광군':
                ma = '11F20102'
                x = 52;
                y = 77;
                break;
            case '장성군':
                ma = '11F20502'
                x = 57;
                y = 77;
                break;
            case '완도군':
                ma = '11F20301'
                x = 57;
                y = 56;
                break;
            case '진도군':
                ma = '11F20201'
                x = 48;
                y = 59;
                break;
            case '신안군':
                ma = '11F20803'
                x = 50;
                y = 66;
                break;
            default:
                x = 51;
                y = 67;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '경상북도') {
        yuksang = '11H10000'
        area_code = 143
        switch (address) {
            case '포항시 남구':
                ma = '11H10201'
                x = 102;
                y = 94;
                break;
            case '포항시 북구':
                ma = '11H10201'
                x = 102;
                y = 95;
                break;
            case '경주시':
                ma = '11H10202'
                x = 100;
                y = 91;
                break;
            case '김천시':
                ma = '11H10601'
                x = 80;
                y = 96;
                break;
            case '안동시':
                ma = '11H10501'
                x = 91;
                y = 106;
                break;
            case '구미시':
                ma = '11H10602'
                x = 84;
                y = 96;
                break;
            case '영주시':
                ma = '11H10401'
                x = 89;
                y = 111;
                break;
            case '영천시':
                ma = '11H10702'
                x = 95;
                y = 93;
                break;
            case '상주시':
                ma = '11H10302'
                x = 81;
                y = 102;
                break;
            case '문경시':
                ma = '11H10301'
                x = 81;
                y = 106;
                break;
            case '경산시':
                ma = '11H10703'
                x = 91;
                y = 90;
                break;
            case '군위군':
                ma = '11H10603'
                x = 88;
                y = 99;
                break;
            case '의성군':
                ma = '11H10502'
                x = 90;
                y = 101;
                break;
            case '청송군':
                ma = '11H10503'
                x = 96;
                y = 103;
                break;
            case '영양군':
                ma = '11H10403'
                x = 97;
                y = 108;
                break;
            case '영덕군':
                ma = '11H10102'
                x = 102;
                y = 103;
                break;
            case '청도군':
                ma = '11H10704'
                x = 91;
                y = 86;
                break;
            case '고령군':
                ma = '11H10604'
                x = 83;
                y = 87;
                break;
            case '성주군':
                ma = '11H10605'
                x = 83;
                y = 91;
                break;
            case '칠곡군':
                ma = '11H10705'
                x = 85;
                y = 93;
                break;
            case '예천군':
                ma = '11H10303'
                x = 86;
                y = 107;
                break;
            case '봉화군':
                ma = '11H10402'
                x = 90;
                y = 113;
                break;
            case '울진군':
                ma = '11H10101'
                x = 102;
                y = 115;
                break;
            case '울릉군':
                ma = '11E00101'
                x = 127;
                y = 127;
                break;
            case '독도':
                ma = '11D00102'
                x = 144;
                y = 123;
                break;
            default:
                x = 89;
                y = 91;
        }
    } else if (document.getElementById('addressDo1').value == '경상남도') {
        yuksang=  '11H20000'
        area_code = 159
        switch (address) {
            case '창원시 의창구':
                ma = '11H20301' 
                x = 90; 
                y = 77;
                break;
            case '창원시 성산구':
                ma = '11H20301' 
                x = 91;
                y = 76;
                break;
            case '창원시 마산합포구':
            case '창원시 마산회원구':
                ma = '11H20301' 
                x = 89;
                y = 76;
                break;
            case '창원시 진해구':
                ma = '11H20301' 
                x = 91;
                y = 75;
                break;
            case '진주시':
                ma = '11H20701' 
                x = 81;
                y = 75;
                break;
            case '통영시':
                ma = '11H20401' 
                x = 87;
                y = 68;
                break;
            case '사천시':
                ma = '11H20402' 
                x = 80;
                y = 71;
                break;
            case '김해시':
                ma = '11H20304' 
                x = 95;
                y = 77;
                break;
            case '밀양시':
                ma = '11H20601' 
                x = 92;
                y = 83;
                break;
            case '거제시':
                ma = '11H20403' 
                x = 90;
                y = 69;
                break;
            case '양산시':
                ma = '11H20102' 
                x = 97;
                y = 79;
                break;
            case '의령군':
                ma = '11H20602' 
                x = 83;
                y = 78;
                break;
            case '함안군':
                ma = '11H20603' 
                x = 86;
                y = 77;
                break;
            case '창녕군':
                ma = '11H20604' 
                x = 87;
                y = 83;
                break;
            case '고성군':
                ma = '11H20404' 
                x = 85;
                y = 71;
                break;
            case '남해군':
                ma = '11H20405' 
                x = 77;
                y = 68;
                break;
            case '하동군':
                ma = '11H20704' 
                x = 74;
                y = 73;
                break;
            case '산청군':
                ma = '11H20703' 
                x = 76;
                y = 80;
                break;
            case '함양군':
                ma = '11H20501' 
                x = 74;
                y = 82;
                break;
            case '거창군':
                ma = '11H20502' 
                x = 77;
                y = 86;
                break;
            case '합천군':
                ma = '11H20503' 
                x = 81;
                y = 84;
                break;
            default:
                x = 91;
                y = 77;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '제주특별자치도') {
        area_code = 184
        yuksang = '11G00000'
        switch (address) {
            case '제주시':
                ma = '11G00101'
                x = 53;
                y = 38;
                break;
            case '서귀포시':
                ma = '11G00401'
                x = 52;
                y = 33;
                break;
            case '이어도':
                ma = '11G00601'
                x = 28;
                y = 8;
            default:
                x = 52;
                x = 38;
                break;
        }
    } else {
        area_code = 108
    }
    var now_temp = 0;
    //API
    var ultra_now_xhr = new XMLHttpRequest();
    var ultra_now_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
    var ultra_now_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    ultra_now_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    ultra_now_xhr.open('GET', ultra_now_url + ultra_now_queryParams);
    ultra_now_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // console.log(ultra_now_url + ultra_now_queryParams);
            try {
                var loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('location').textContent = '에러 발생.'
            }
            if (loaded.response.header.resultCode = "00") {
                main = loaded.response.body.items.item;

                //현재 기온
                document.getElementById('now_temp').textContent = loaded.response.body.items.item[3].obsrValue;
                //1시간 강수량
                document.getElementById('now_rain').textContent = loaded.response.body.items.item[2].obsrValue;
                //습도
                document.getElementById('now_humid').textContent = loaded.response.body.items.item[1].obsrValue;
                // 바람
                var wind_dir = loaded.response.body.items.item[5].obsrValue
                document.getElementById('now_wind_dir').style = 'transform: rotate(' + wind_dir + 'deg)';

                document.getElementById('now_wind_str').textContent = loaded.response.body.items.item[7].obsrValue;

                //그래프
                now_temp = parseFloat(loaded.response.body.items.item[3].obsrValue)
                now_temp = Number(now_temp)
                wind = Number(loaded.response.body.items.item[7].obsrValue) * 3.6
                //체감기온
                console.log(wind)
                var body_temp = 13.12 + 0.6215 * now_temp
                body_temp = body_temp - 11.37 * Math.pow(wind, 0.16)
                body_temp = body_temp + 0.3965 * Math.pow(wind, 0.16) * now_temp;
                body_temp = Math.ceil(body_temp * 10) / 10
                document.getElementById('body_temp').textContent = body_temp;
            }
        }
    };

    var ultra_fore_xhr = new XMLHttpRequest();
    var ultra_fore_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; /*URL*/
    var ultra_fore_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    ultra_fore_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    ultra_fore_xhr.open('GET', ultra_fore_url + ultra_fore_queryParams);
    ultra_fore_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // console.log(ultra_fore_url + ultra_fore_queryParams);
            try {
                var ultra_fore_loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('location').textContent = '에러 발생.'
            }
            if (ultra_fore_loaded.response.header.resultCode = "00") {
                var ultra_fore_main = ultra_fore_loaded.response.body.items.item;
                var ultra_temp = []
                var ultra_wind = []
                var ultra_wind_dir = []
                var ultra_humid = []
                var ultra_rain = []
                var ultra_sky = []
                var ultra_rain_form = []
                for (i = 0; i < ultra_fore_main.length; i++) {
                    if (ultra_fore_main[i].category == 'T1H') {
                        ultra_temp.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'WSD') {
                        ultra_wind.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'REH') {
                        ultra_humid.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'VEC') {
                        ultra_wind_dir.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'RN1') {
                        if (ultra_fore_main[i].fcstValue == '강수없음') {
                            ultra_rain.push('--')
                        } else {
                            ultra_rain.push(ultra_fore_main[i].fcstValue)
                        }
                    } else if (ultra_fore_main[i].category == 'SKY') {
                        if (ultra_fore_main[i].fcstValue == '1') {
                            ultra_sky.push('맑음')
                        } else if (ultra_fore_main[i].fcstValue == '3') {
                            ultra_sky.push('구름 많음')
                        } else if (ultra_fore_main[i].fcstValue == '4') {
                            ultra_sky.push('흐림')
                        }
                    } else if (ultra_fore_main[i].category == 'PTY') {
                        if (ultra_fore_main[i].fcstValue == '0') {
                            ultra_rain_form.push('-')
                        } else if (ultra_fore_main[i].fcstValue == '1') {
                            ultra_rain_form.push('비')
                        } else if (ultra_fore_main[i].fcstValue == '2') {
                            ultra_rain_form.push('비/눈')
                        } else if (ultra_fore_main[i].fcstValue == '3') {
                            ultra_rain_form.push('눈')
                        } else if (ultra_fore_main[i].fcstValue == '5') {
                            ultra_rain_form.push('빗방울')
                        } else if (ultra_fore_main[i].fcstValue == '6') {
                            ultra_rain_form.push('비/눈날림')
                        } else if (ultra_fore_main[i].fcstValue == '7') {
                            ultra_rain_form.push('눈날림')
                        }
                    }
                }
                document.getElementById('ultra_temp1').textContent = `${ultra_temp[0]}℃`
                document.getElementById('ultra_temp2').textContent = `${ultra_temp[1]}℃`
                document.getElementById('ultra_temp3').textContent = `${ultra_temp[2]}℃`
                document.getElementById('ultra_temp4').textContent = `${ultra_temp[3]}℃`
                document.getElementById('ultra_temp5').textContent = `${ultra_temp[4]}℃`
                document.getElementById('ultra_temp6').textContent = `${ultra_temp[5]}℃`

                document.getElementById('ultra_wind1').textContent = `${ultra_wind[0]}m/s`
                document.getElementById('ultra_wind2').textContent = `${ultra_wind[1]}m/s`
                document.getElementById('ultra_wind3').textContent = `${ultra_wind[2]}m/s`
                document.getElementById('ultra_wind4').textContent = `${ultra_wind[3]}m/s`
                document.getElementById('ultra_wind5').textContent = `${ultra_wind[4]}m/s`
                document.getElementById('ultra_wind6').textContent = `${ultra_wind[5]}m/s`

                document.getElementById('ultra_wind_dir1').textContent = `${ultra_wind_dir[0]}도`
                document.getElementById('ultra_wind_dir2').textContent = `${ultra_wind_dir[1]}도`
                document.getElementById('ultra_wind_dir3').textContent = `${ultra_wind_dir[2]}도`
                document.getElementById('ultra_wind_dir4').textContent = `${ultra_wind_dir[3]}도`
                document.getElementById('ultra_wind_dir5').textContent = `${ultra_wind_dir[4]}도`
                document.getElementById('ultra_wind_dir6').textContent = `${ultra_wind_dir[5]}도`
                document.getElementById('ultra_wind_dir1').style = 'transform: rotate(' + ultra_wind_dir[0] + 'deg); display: block '
                document.getElementById('ultra_wind_dir2').style = 'transform: rotate(' + ultra_wind_dir[1] + 'deg); display: block '
                document.getElementById('ultra_wind_dir3').style = 'transform: rotate(' + ultra_wind_dir[2] + 'deg); display: block '
                document.getElementById('ultra_wind_dir4').style = 'transform: rotate(' + ultra_wind_dir[3] + 'deg); display: block '
                document.getElementById('ultra_wind_dir5').style = 'transform: rotate(' + ultra_wind_dir[4] + 'deg); display: block '
                document.getElementById('ultra_wind_dir6').style = 'transform: rotate(' + ultra_wind_dir[5] + 'deg); display: block '

                document.getElementById('ultra_humid1').textContent = `${ultra_humid[0]}%`
                document.getElementById('ultra_humid2').textContent = `${ultra_humid[1]}%`
                document.getElementById('ultra_humid3').textContent = `${ultra_humid[2]}%`
                document.getElementById('ultra_humid4').textContent = `${ultra_humid[3]}%`
                document.getElementById('ultra_humid5').textContent = `${ultra_humid[4]}%`
                document.getElementById('ultra_humid6').textContent = `${ultra_humid[5]}%`

                document.getElementById('ultra_rain1').textContent = `${ultra_rain[0]}`
                document.getElementById('ultra_rain2').textContent = `${ultra_rain[1]}`
                document.getElementById('ultra_rain3').textContent = `${ultra_rain[2]}`
                document.getElementById('ultra_rain4').textContent = `${ultra_rain[3]}`
                document.getElementById('ultra_rain5').textContent = `${ultra_rain[4]}`
                document.getElementById('ultra_rain6').textContent = `${ultra_rain[5]}`

                document.getElementById('ultra_sky1').textContent = `${ultra_sky[0]}`
                document.getElementById('ultra_sky2').textContent = `${ultra_sky[1]}`
                document.getElementById('ultra_sky3').textContent = `${ultra_sky[2]}`
                document.getElementById('ultra_sky4').textContent = `${ultra_sky[3]}`
                document.getElementById('ultra_sky5').textContent = `${ultra_sky[4]}`
                document.getElementById('ultra_sky6').textContent = `${ultra_sky[5]}`

                document.getElementById('ultra_rain_form1').textContent = `${ultra_rain_form[0]}`
                document.getElementById('ultra_rain_form2').textContent = `${ultra_rain_form[1]}`
                document.getElementById('ultra_rain_form3').textContent = `${ultra_rain_form[2]}`
                document.getElementById('ultra_rain_form4').textContent = `${ultra_rain_form[3]}`
                document.getElementById('ultra_rain_form5').textContent = `${ultra_rain_form[4]}`
                document.getElementById('ultra_rain_form6').textContent = `${ultra_rain_form[5]}`
            }
        }
    };
    var max_temp;
    var min_temp;
    var fore_xhr = new XMLHttpRequest();
    var fore_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    var fore_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    fore_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    fore_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    fore_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    fore_queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    fore_queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent("0200"); /**/
    fore_queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    fore_queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    fore_xhr.open('GET', fore_url + fore_queryParams);
    fore_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(fore_url + fore_queryParams);
            try {
                var fore_loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('location').textContent = '에러 발생.'
            }
            if (fore_loaded.response.header.resultCode = "00") {
                var fore_main = fore_loaded.response.body.items.item;
                for (i = 0; i < fore_main.length; i++) {
                    if (fore_main[i].category == "TMX") {
                        max_temp = fore_main[i].fcstValue;
                    }
                    if (fore_main[i].category == "TMN") {
                        min_temp = fore_main[i].fcstValue;
                    }
                }
                document.getElementById('min_temp').textContent = "▼" + min_temp;
                document.getElementById('max_temp').textContent = "▲" + max_temp;

                var temp = []
                var wind = []
                var wind_spd = []
                var humid = []
                var sky = []
                var rain = []
                var per = []
                var form = []
                var snow = [];
                for (i = 0; i< fore_main.length; i++){
                    if(fore_main[i].category == 'TMP'){
                        temp.push(fore_main[i].fcstValue)
                    }else if (fore_main[i].category == 'VEC'){
                        wind.push(fore_main[i].fcstValue)
                    }else if(fore_main[i].category == 'WSD'){
                        wind_spd.push(fore_main[i].fcstValue)
                    }else if(fore_main[i].category == 'REH'){
                        humid.push(fore_main[i].fcstValue)
                    }else if(fore_main[i].category == 'SKY'){
                        if (fore_main[i].fcstValue == '1') {
                            sky.push('맑음')
                        } else if (fore_main[i].fcstValue == '3') {
                            sky.push('구름 많음')
                        } else if (fore_main[i].fcstValue == '4') {
                            sky.push('흐림')
                        }
                    }else if(fore_main[i].category == 'PCP'){
                        if (fore_main[i].fcstValue == '강수없음') {
                            rain.push('--')
                        } else {
                            rain.push(fore_main[i].fcstValue)
                        }
                    }else if(fore_main[i].category == 'POP'){
                        per.push(fore_main[i].fcstValue)
                    }else if(fore_main[i].category == 'PTY'){
                        if (fore_main[i].fcstValue == '0') {
                            form.push('-')
                        } else if (fore_main[i].fcstValue == '1') {
                            form.push('비')
                        } else if (fore_main[i].fcstValue == '2') {
                            form.push('비/눈')
                        } else if (fore_main[i].fcstValue == '3') {
                            form.push('눈')
                        } else if (fore_main[i].fcstValue == '5') {
                            form.push('빗방울')
                        } else if (fore_main[i].fcstValue == '6') {
                            form.push('비/눈날림')
                        } else if (fore_main[i].fcstValue == '7') {
                            form.push('눈날림')
                        }
                    }else if(fore_main[i].category == 'SNO'){
                        if (fore_main[i].fcstValue == '적설없음'){
                            snow.push('-')
                        }else{
                            snow.push(fore_main[i].fcstValue)
                        }
                    }
                }
                if(1==1){ //기온
                    document.getElementById('sh_temp1_3').textContent = `${temp[0]}℃`
                    document.getElementById('sh_temp1_4').textContent = `${temp[1]}℃`
                    document.getElementById('sh_temp1_5').textContent = `${temp[2]}℃`
                    document.getElementById('sh_temp1_6').textContent = `${temp[3]}℃`
                    document.getElementById('sh_temp1_7').textContent = `${temp[4]}℃`
                    document.getElementById('sh_temp1_8').textContent = `${temp[5]}℃`
                    document.getElementById('sh_temp1_9').textContent = `${temp[6]}℃`
                    document.getElementById('sh_temp1_10').textContent = `${temp[7]}℃`
                    document.getElementById('sh_temp1_11').textContent = `${temp[8]}℃`
                    document.getElementById('sh_temp1_12').textContent = `${temp[9]}℃`
                    document.getElementById('sh_temp1_13').textContent = `${temp[10]}℃`
                    document.getElementById('sh_temp1_14').textContent = `${temp[11]}℃`
                    document.getElementById('sh_temp1_15').textContent = `${temp[12]}℃`
                    document.getElementById('sh_temp1_16').textContent = `${temp[13]}℃`
                    document.getElementById('sh_temp1_17').textContent = `${temp[14]}℃`
                    document.getElementById('sh_temp1_18').textContent = `${temp[15]}℃`
                    document.getElementById('sh_temp1_19').textContent = `${temp[16]}℃`
                    document.getElementById('sh_temp1_20').textContent = `${temp[17]}℃`
                    document.getElementById('sh_temp1_21').textContent = `${temp[18]}℃`
                    document.getElementById('sh_temp1_22').textContent = `${temp[19]}℃`
                    document.getElementById('sh_temp1_23').textContent = `${temp[20]}℃`
                    document.getElementById('sh_temp2_0').textContent = `${temp[21]}℃`
                    document.getElementById('sh_temp2_1').textContent = `${temp[22]}℃`
                    document.getElementById('sh_temp2_2').textContent = `${temp[23]}℃`
                    document.getElementById('sh_temp2_3').textContent = `${temp[24]}℃`
                    document.getElementById('sh_temp2_4').textContent = `${temp[25]}℃`
                    document.getElementById('sh_temp2_5').textContent = `${temp[26]}℃`
                    document.getElementById('sh_temp2_6').textContent = `${temp[27]}℃`
                    document.getElementById('sh_temp2_7').textContent = `${temp[28]}℃`
                    document.getElementById('sh_temp2_8').textContent = `${temp[29]}℃`
                    document.getElementById('sh_temp2_9').textContent = `${temp[30]}℃`
                    document.getElementById('sh_temp2_10').textContent = `${temp[31]}℃`
                    document.getElementById('sh_temp2_11').textContent = `${temp[32]}℃`
                    document.getElementById('sh_temp2_12').textContent = `${temp[33]}℃`
                    document.getElementById('sh_temp2_13').textContent = `${temp[34]}℃`
                    document.getElementById('sh_temp2_14').textContent = `${temp[35]}℃`
                    document.getElementById('sh_temp2_15').textContent = `${temp[36]}℃`
                    document.getElementById('sh_temp2_16').textContent = `${temp[37]}℃`
                    document.getElementById('sh_temp2_17').textContent = `${temp[38]}℃`
                    document.getElementById('sh_temp2_18').textContent = `${temp[39]}℃`
                    document.getElementById('sh_temp2_19').textContent = `${temp[40]}℃`
                    document.getElementById('sh_temp2_20').textContent = `${temp[41]}℃`
                    document.getElementById('sh_temp2_21').textContent = `${temp[42]}℃`
                    document.getElementById('sh_temp2_22').textContent = `${temp[43]}℃`
                    document.getElementById('sh_temp2_23').textContent = `${temp[44]}℃`
                    document.getElementById('sh_temp3_0').textContent = `${temp[45]}℃`
                    document.getElementById('sh_temp3_1').textContent = `${temp[46]}℃`
                    document.getElementById('sh_temp3_2').textContent = `${temp[47]}℃`
                    document.getElementById('sh_temp3_3').textContent = `${temp[48]}℃`
                    document.getElementById('sh_temp3_4').textContent = `${temp[49]}℃`
                    document.getElementById('sh_temp3_5').textContent = `${temp[50]}℃`
                    document.getElementById('sh_temp3_6').textContent = `${temp[51]}℃`
                    document.getElementById('sh_temp3_7').textContent = `${temp[52]}℃`
                    document.getElementById('sh_temp3_8').textContent = `${temp[53]}℃`
                    document.getElementById('sh_temp3_9').textContent = `${temp[54]}℃`
                    document.getElementById('sh_temp3_10').textContent = `${temp[55]}℃`
                    document.getElementById('sh_temp3_11').textContent = `${temp[56]}℃`
                    document.getElementById('sh_temp3_12').textContent = `${temp[57]}℃`
                    document.getElementById('sh_temp3_13').textContent = `${temp[58]}℃`
                    document.getElementById('sh_temp3_14').textContent = `${temp[59]}℃`
                    document.getElementById('sh_temp3_15').textContent = `${temp[60]}℃`
                    document.getElementById('sh_temp3_16').textContent = `${temp[61]}℃`
                    document.getElementById('sh_temp3_17').textContent = `${temp[62]}℃`
                    document.getElementById('sh_temp3_18').textContent = `${temp[63]}℃`
                    document.getElementById('sh_temp3_19').textContent = `${temp[64]}℃`
                    document.getElementById('sh_temp3_20').textContent = `${temp[65]}℃`
                    document.getElementById('sh_temp3_21').textContent = `${temp[66]}℃`
                    document.getElementById('sh_temp3_22').textContent = `${temp[67]}℃`
                    document.getElementById('sh_temp3_23').textContent = `${temp[68]}℃`
                    document.getElementById('sh_temp4_0').textContent = `${temp[69]}℃`
                }
                if(1==1){ //풍향
                    document.getElementById('sh_wind_dir1_3').textContent = `${wind[0]}°`
                    document.getElementById('sh_wind_dir1_4').textContent = `${wind[1]}°`
                    document.getElementById('sh_wind_dir1_5').textContent = `${wind[2]}°`
                    document.getElementById('sh_wind_dir1_6').textContent = `${wind[3]}°`
                    document.getElementById('sh_wind_dir1_7').textContent = `${wind[4]}°`
                    document.getElementById('sh_wind_dir1_8').textContent = `${wind[5]}°`
                    document.getElementById('sh_wind_dir1_9').textContent = `${wind[6]}°`
                    document.getElementById('sh_wind_dir1_10').textContent = `${wind[7]}°`
                    document.getElementById('sh_wind_dir1_11').textContent = `${wind[8]}°`
                    document.getElementById('sh_wind_dir1_12').textContent = `${wind[9]}°`
                    document.getElementById('sh_wind_dir1_13').textContent = `${wind[10]}°`
                    document.getElementById('sh_wind_dir1_14').textContent = `${wind[11]}°`
                    document.getElementById('sh_wind_dir1_15').textContent = `${wind[12]}°`
                    document.getElementById('sh_wind_dir1_16').textContent = `${wind[13]}°`
                    document.getElementById('sh_wind_dir1_17').textContent = `${wind[14]}°`
                    document.getElementById('sh_wind_dir1_18').textContent = `${wind[15]}°`
                    document.getElementById('sh_wind_dir1_19').textContent = `${wind[16]}°`
                    document.getElementById('sh_wind_dir1_20').textContent = `${wind[17]}°`
                    document.getElementById('sh_wind_dir1_21').textContent = `${wind[18]}°`
                    document.getElementById('sh_wind_dir1_22').textContent = `${wind[19]}°`
                    document.getElementById('sh_wind_dir1_23').textContent = `${wind[20]}°`
                    document.getElementById('sh_wind_dir2_0').textContent = `${wind[21]}°`
                    document.getElementById('sh_wind_dir2_1').textContent = `${wind[22]}°`
                    document.getElementById('sh_wind_dir2_2').textContent = `${wind[23]}°`
                    document.getElementById('sh_wind_dir2_3').textContent = `${wind[24]}°`
                    document.getElementById('sh_wind_dir2_4').textContent = `${wind[25]}°`
                    document.getElementById('sh_wind_dir2_5').textContent = `${wind[26]}°`
                    document.getElementById('sh_wind_dir2_6').textContent = `${wind[27]}°`
                    document.getElementById('sh_wind_dir2_7').textContent = `${wind[28]}°`
                    document.getElementById('sh_wind_dir2_8').textContent = `${wind[29]}°`
                    document.getElementById('sh_wind_dir2_9').textContent = `${wind[30]}°`
                    document.getElementById('sh_wind_dir2_10').textContent = `${wind[31]}°`
                    document.getElementById('sh_wind_dir2_11').textContent = `${wind[32]}°`
                    document.getElementById('sh_wind_dir2_12').textContent = `${wind[33]}°`
                    document.getElementById('sh_wind_dir2_13').textContent = `${wind[34]}°`
                    document.getElementById('sh_wind_dir2_14').textContent = `${wind[35]}°`
                    document.getElementById('sh_wind_dir2_15').textContent = `${wind[36]}°`
                    document.getElementById('sh_wind_dir2_16').textContent = `${wind[37]}°`
                    document.getElementById('sh_wind_dir2_17').textContent = `${wind[38]}°`
                    document.getElementById('sh_wind_dir2_18').textContent = `${wind[39]}°`
                    document.getElementById('sh_wind_dir2_19').textContent = `${wind[40]}°`
                    document.getElementById('sh_wind_dir2_20').textContent = `${wind[41]}°`
                    document.getElementById('sh_wind_dir2_21').textContent = `${wind[42]}°`
                    document.getElementById('sh_wind_dir2_22').textContent = `${wind[43]}°`
                    document.getElementById('sh_wind_dir2_23').textContent = `${wind[44]}°`
                    document.getElementById('sh_wind_dir3_0').textContent = `${wind[45]}°`
                    document.getElementById('sh_wind_dir3_1').textContent = `${wind[46]}°`
                    document.getElementById('sh_wind_dir3_2').textContent = `${wind[47]}°`
                    document.getElementById('sh_wind_dir3_3').textContent = `${wind[48]}°`
                    document.getElementById('sh_wind_dir3_4').textContent = `${wind[49]}°`
                    document.getElementById('sh_wind_dir3_5').textContent = `${wind[50]}°`
                    document.getElementById('sh_wind_dir3_6').textContent = `${wind[51]}°`
                    document.getElementById('sh_wind_dir3_7').textContent = `${wind[52]}°`
                    document.getElementById('sh_wind_dir3_8').textContent = `${wind[53]}°`
                    document.getElementById('sh_wind_dir3_9').textContent = `${wind[54]}°`
                    document.getElementById('sh_wind_dir3_10').textContent = `${wind[55]}°`
                    document.getElementById('sh_wind_dir3_11').textContent = `${wind[56]}°`
                    document.getElementById('sh_wind_dir3_12').textContent = `${wind[57]}°`
                    document.getElementById('sh_wind_dir3_13').textContent = `${wind[58]}°`
                    document.getElementById('sh_wind_dir3_14').textContent = `${wind[59]}°`
                    document.getElementById('sh_wind_dir3_15').textContent = `${wind[60]}°`
                    document.getElementById('sh_wind_dir3_16').textContent = `${wind[61]}°`
                    document.getElementById('sh_wind_dir3_17').textContent = `${wind[62]}°`
                    document.getElementById('sh_wind_dir3_18').textContent = `${wind[63]}°`
                    document.getElementById('sh_wind_dir3_19').textContent = `${wind[64]}°`
                    document.getElementById('sh_wind_dir3_20').textContent = `${wind[65]}°`
                    document.getElementById('sh_wind_dir3_21').textContent = `${wind[66]}°`
                    document.getElementById('sh_wind_dir3_22').textContent = `${wind[67]}°`
                    document.getElementById('sh_wind_dir3_23').textContent = `${wind[68]}°`
                    document.getElementById('sh_wind_dir4_0').textContent = `${wind[69]}°`
                    document.getElementById('sh_wind_dir1_3').style = 'transform: rotate(' + wind[0]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_4').style = 'transform: rotate(' + wind[1]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_5').style = 'transform: rotate(' + wind[2]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_6').style = 'transform: rotate(' + wind[3]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_7').style = 'transform: rotate(' + wind[4]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_8').style = 'transform: rotate(' + wind[5]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_9').style = 'transform: rotate(' + wind[6]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_10').style = 'transform: rotate(' + wind[7]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_11').style = 'transform: rotate(' + wind[8]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_12').style = 'transform: rotate(' + wind[9]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_13').style = 'transform: rotate(' + wind[10]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_14').style = 'transform: rotate(' + wind[11]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_15').style = 'transform: rotate(' + wind[12]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_16').style = 'transform: rotate(' + wind[13]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_17').style = 'transform: rotate(' + wind[14]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_18').style = 'transform: rotate(' + wind[15]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_19').style = 'transform: rotate(' + wind[16]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_20').style = 'transform: rotate(' + wind[17]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_21').style = 'transform: rotate(' + wind[18]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_22').style = 'transform: rotate(' + wind[19]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir1_23').style = 'transform: rotate(' + wind[20]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_0').style = 'transform: rotate(' + wind[21]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_1').style = 'transform: rotate(' + wind[22]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_2').style = 'transform: rotate(' + wind[23]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_3').style = 'transform: rotate(' + wind[24]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_4').style = 'transform: rotate(' + wind[25]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_5').style = 'transform: rotate(' + wind[26]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_6').style = 'transform: rotate(' + wind[27]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_7').style = 'transform: rotate(' + wind[28]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_8').style = 'transform: rotate(' + wind[29]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_9').style = 'transform: rotate(' + wind[30]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_10').style = 'transform: rotate(' + wind[31]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_11').style = 'transform: rotate(' + wind[32]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_12').style = 'transform: rotate(' + wind[33]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_13').style = 'transform: rotate(' + wind[34]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_14').style = 'transform: rotate(' + wind[35]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_15').style = 'transform: rotate(' + wind[36]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_16').style = 'transform: rotate(' + wind[37]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_17').style = 'transform: rotate(' + wind[38]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_18').style = 'transform: rotate(' + wind[39]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_19').style = 'transform: rotate(' + wind[40]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_20').style = 'transform: rotate(' + wind[41]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_21').style = 'transform: rotate(' + wind[42]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_22').style = 'transform: rotate(' + wind[43]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir2_23').style = 'transform: rotate(' + wind[44]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_0').style = 'transform: rotate(' + wind[45]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_1').style = 'transform: rotate(' + wind[46]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_2').style = 'transform: rotate(' + wind[47]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_3').style = 'transform: rotate(' + wind[48]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_4').style = 'transform: rotate(' + wind[49]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_5').style = 'transform: rotate(' + wind[50]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_6').style = 'transform: rotate(' + wind[51]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_7').style = 'transform: rotate(' + wind[52]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_8').style = 'transform: rotate(' + wind[53]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_9').style = 'transform: rotate(' + wind[54]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_10').style = 'transform: rotate(' + wind[55]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_11').style = 'transform: rotate(' + wind[56]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_12').style = 'transform: rotate(' + wind[57]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_13').style = 'transform: rotate(' + wind[58]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_14').style = 'transform: rotate(' + wind[59]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_15').style = 'transform: rotate(' + wind[60]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_16').style = 'transform: rotate(' + wind[61]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_17').style = 'transform: rotate(' + wind[62]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_18').style = 'transform: rotate(' + wind[63]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_19').style = 'transform: rotate(' + wind[64]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_20').style = 'transform: rotate(' + wind[65]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_21').style = 'transform: rotate(' + wind[66]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_22').style = 'transform: rotate(' + wind[67]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir3_23').style = 'transform: rotate(' + wind[68]+ 'deg); display: block'
                    document.getElementById('sh_wind_dir4_0').style = 'transform: rotate(' + wind[69]+ 'deg); display: block'
                }
                if(1==1){ //풍속
                    document.getElementById('sh_wind1_3').textContent = `${wind_spd[0]}m/s`
                    document.getElementById('sh_wind1_4').textContent = `${wind_spd[1]}m/s`
                    document.getElementById('sh_wind1_5').textContent = `${wind_spd[2]}m/s`
                    document.getElementById('sh_wind1_6').textContent = `${wind_spd[3]}m/s`
                    document.getElementById('sh_wind1_7').textContent = `${wind_spd[4]}m/s`
                    document.getElementById('sh_wind1_8').textContent = `${wind_spd[5]}m/s`
                    document.getElementById('sh_wind1_9').textContent = `${wind_spd[6]}m/s`
                    document.getElementById('sh_wind1_10').textContent = `${wind_spd[7]}m/s`
                    document.getElementById('sh_wind1_11').textContent = `${wind_spd[8]}m/s`
                    document.getElementById('sh_wind1_12').textContent = `${wind_spd[9]}m/s`
                    document.getElementById('sh_wind1_13').textContent = `${wind_spd[10]}m/s`
                    document.getElementById('sh_wind1_14').textContent = `${wind_spd[11]}m/s`
                    document.getElementById('sh_wind1_15').textContent = `${wind_spd[12]}m/s`
                    document.getElementById('sh_wind1_16').textContent = `${wind_spd[13]}m/s`
                    document.getElementById('sh_wind1_17').textContent = `${wind_spd[14]}m/s`
                    document.getElementById('sh_wind1_18').textContent = `${wind_spd[15]}m/s`
                    document.getElementById('sh_wind1_19').textContent = `${wind_spd[16]}m/s`
                    document.getElementById('sh_wind1_20').textContent = `${wind_spd[17]}m/s`
                    document.getElementById('sh_wind1_21').textContent = `${wind_spd[18]}m/s`
                    document.getElementById('sh_wind1_22').textContent = `${wind_spd[19]}m/s`
                    document.getElementById('sh_wind1_23').textContent = `${wind_spd[20]}m/s`
                    document.getElementById('sh_wind2_0').textContent = `${wind_spd[21]}m/s`
                    document.getElementById('sh_wind2_1').textContent = `${wind_spd[22]}m/s`
                    document.getElementById('sh_wind2_2').textContent = `${wind_spd[23]}m/s`
                    document.getElementById('sh_wind2_3').textContent = `${wind_spd[24]}m/s`
                    document.getElementById('sh_wind2_4').textContent = `${wind_spd[25]}m/s`
                    document.getElementById('sh_wind2_5').textContent = `${wind_spd[26]}m/s`
                    document.getElementById('sh_wind2_6').textContent = `${wind_spd[27]}m/s`
                    document.getElementById('sh_wind2_7').textContent = `${wind_spd[28]}m/s`
                    document.getElementById('sh_wind2_8').textContent = `${wind_spd[29]}m/s`
                    document.getElementById('sh_wind2_9').textContent = `${wind_spd[30]}m/s`
                    document.getElementById('sh_wind2_10').textContent = `${wind_spd[31]}m/s`
                    document.getElementById('sh_wind2_11').textContent = `${wind_spd[32]}m/s`
                    document.getElementById('sh_wind2_12').textContent = `${wind_spd[33]}m/s`
                    document.getElementById('sh_wind2_13').textContent = `${wind_spd[34]}m/s`
                    document.getElementById('sh_wind2_14').textContent = `${wind_spd[35]}m/s`
                    document.getElementById('sh_wind2_15').textContent = `${wind_spd[36]}m/s`
                    document.getElementById('sh_wind2_16').textContent = `${wind_spd[37]}m/s`
                    document.getElementById('sh_wind2_17').textContent = `${wind_spd[38]}m/s`
                    document.getElementById('sh_wind2_18').textContent = `${wind_spd[39]}m/s`
                    document.getElementById('sh_wind2_19').textContent = `${wind_spd[40]}m/s`
                    document.getElementById('sh_wind2_20').textContent = `${wind_spd[41]}m/s`
                    document.getElementById('sh_wind2_21').textContent = `${wind_spd[42]}m/s`
                    document.getElementById('sh_wind2_22').textContent = `${wind_spd[43]}m/s`
                    document.getElementById('sh_wind2_23').textContent = `${wind_spd[44]}m/s`
                    document.getElementById('sh_wind3_0').textContent = `${wind_spd[45]}m/s`
                    document.getElementById('sh_wind3_1').textContent = `${wind_spd[46]}m/s`
                    document.getElementById('sh_wind3_2').textContent = `${wind_spd[47]}m/s`
                    document.getElementById('sh_wind3_3').textContent = `${wind_spd[48]}m/s`
                    document.getElementById('sh_wind3_4').textContent = `${wind_spd[49]}m/s`
                    document.getElementById('sh_wind3_5').textContent = `${wind_spd[50]}m/s`
                    document.getElementById('sh_wind3_6').textContent = `${wind_spd[51]}m/s`
                    document.getElementById('sh_wind3_7').textContent = `${wind_spd[52]}m/s`
                    document.getElementById('sh_wind3_8').textContent = `${wind_spd[53]}m/s`
                    document.getElementById('sh_wind3_9').textContent = `${wind_spd[54]}m/s`
                    document.getElementById('sh_wind3_10').textContent = `${wind_spd[55]}m/s`
                    document.getElementById('sh_wind3_11').textContent = `${wind_spd[56]}m/s`
                    document.getElementById('sh_wind3_12').textContent = `${wind_spd[57]}m/s`
                    document.getElementById('sh_wind3_13').textContent = `${wind_spd[58]}m/s`
                    document.getElementById('sh_wind3_14').textContent = `${wind_spd[59]}m/s`
                    document.getElementById('sh_wind3_15').textContent = `${wind_spd[60]}m/s`
                    document.getElementById('sh_wind3_16').textContent = `${wind_spd[61]}m/s`
                    document.getElementById('sh_wind3_17').textContent = `${wind_spd[62]}m/s`
                    document.getElementById('sh_wind3_18').textContent = `${wind_spd[63]}m/s`
                    document.getElementById('sh_wind3_19').textContent = `${wind_spd[64]}m/s`
                    document.getElementById('sh_wind3_20').textContent = `${wind_spd[65]}m/s`
                    document.getElementById('sh_wind3_21').textContent = `${wind_spd[66]}m/s`
                    document.getElementById('sh_wind3_22').textContent = `${wind_spd[67]}m/s`
                    document.getElementById('sh_wind3_23').textContent = `${wind_spd[68]}m/s`
                    document.getElementById('sh_wind4_0').textContent = `${wind_spd[69]}m/s`
                }
                if (1==1){ //습도
                    document.getElementById('sh_humid1_3').textContent = `${humid[0]}%`
                    document.getElementById('sh_humid1_4').textContent = `${humid[1]}%`
                    document.getElementById('sh_humid1_5').textContent = `${humid[2]}%`
                    document.getElementById('sh_humid1_6').textContent = `${humid[3]}%`
                    document.getElementById('sh_humid1_7').textContent = `${humid[4]}%`
                    document.getElementById('sh_humid1_8').textContent = `${humid[5]}%`
                    document.getElementById('sh_humid1_9').textContent = `${humid[6]}%`
                    document.getElementById('sh_humid1_10').textContent = `${humid[7]}%`
                    document.getElementById('sh_humid1_11').textContent = `${humid[8]}%`
                    document.getElementById('sh_humid1_12').textContent = `${humid[9]}%`
                    document.getElementById('sh_humid1_13').textContent = `${humid[10]}%`
                    document.getElementById('sh_humid1_14').textContent = `${humid[11]}%`
                    document.getElementById('sh_humid1_15').textContent = `${humid[12]}%`
                    document.getElementById('sh_humid1_16').textContent = `${humid[13]}%`
                    document.getElementById('sh_humid1_17').textContent = `${humid[14]}%`
                    document.getElementById('sh_humid1_18').textContent = `${humid[15]}%`
                    document.getElementById('sh_humid1_19').textContent = `${humid[16]}%`
                    document.getElementById('sh_humid1_20').textContent = `${humid[17]}%`
                    document.getElementById('sh_humid1_21').textContent = `${humid[18]}%`
                    document.getElementById('sh_humid1_22').textContent = `${humid[19]}%`
                    document.getElementById('sh_humid1_23').textContent = `${humid[20]}%`
                    document.getElementById('sh_humid2_0').textContent = `${humid[21]}%`
                    document.getElementById('sh_humid2_1').textContent = `${humid[22]}%`
                    document.getElementById('sh_humid2_2').textContent = `${humid[23]}%`
                    document.getElementById('sh_humid2_3').textContent = `${humid[24]}%`
                    document.getElementById('sh_humid2_4').textContent = `${humid[25]}%`
                    document.getElementById('sh_humid2_5').textContent = `${humid[26]}%`
                    document.getElementById('sh_humid2_6').textContent = `${humid[27]}%`
                    document.getElementById('sh_humid2_7').textContent = `${humid[28]}%`
                    document.getElementById('sh_humid2_8').textContent = `${humid[29]}%`
                    document.getElementById('sh_humid2_9').textContent = `${humid[30]}%`
                    document.getElementById('sh_humid2_10').textContent = `${humid[31]}%`
                    document.getElementById('sh_humid2_11').textContent = `${humid[32]}%`
                    document.getElementById('sh_humid2_12').textContent = `${humid[33]}%`
                    document.getElementById('sh_humid2_13').textContent = `${humid[34]}%`
                    document.getElementById('sh_humid2_14').textContent = `${humid[35]}%`
                    document.getElementById('sh_humid2_15').textContent = `${humid[36]}%`
                    document.getElementById('sh_humid2_16').textContent = `${humid[37]}%`
                    document.getElementById('sh_humid2_17').textContent = `${humid[38]}%`
                    document.getElementById('sh_humid2_18').textContent = `${humid[39]}%`
                    document.getElementById('sh_humid2_19').textContent = `${humid[40]}%`
                    document.getElementById('sh_humid2_20').textContent = `${humid[41]}%`
                    document.getElementById('sh_humid2_21').textContent = `${humid[42]}%`
                    document.getElementById('sh_humid2_22').textContent = `${humid[43]}%`
                    document.getElementById('sh_humid2_23').textContent = `${humid[44]}%`
                    document.getElementById('sh_humid3_0').textContent = `${humid[45]}%`
                    document.getElementById('sh_humid3_1').textContent = `${humid[46]}%`
                    document.getElementById('sh_humid3_2').textContent = `${humid[47]}%`
                    document.getElementById('sh_humid3_3').textContent = `${humid[48]}%`
                    document.getElementById('sh_humid3_4').textContent = `${humid[49]}%`
                    document.getElementById('sh_humid3_5').textContent = `${humid[50]}%`
                    document.getElementById('sh_humid3_6').textContent = `${humid[51]}%`
                    document.getElementById('sh_humid3_7').textContent = `${humid[52]}%`
                    document.getElementById('sh_humid3_8').textContent = `${humid[53]}%`
                    document.getElementById('sh_humid3_9').textContent = `${humid[54]}%`
                    document.getElementById('sh_humid3_10').textContent = `${humid[55]}%`
                    document.getElementById('sh_humid3_11').textContent = `${humid[56]}%`
                    document.getElementById('sh_humid3_12').textContent = `${humid[57]}%`
                    document.getElementById('sh_humid3_13').textContent = `${humid[58]}%`
                    document.getElementById('sh_humid3_14').textContent = `${humid[59]}%`
                    document.getElementById('sh_humid3_15').textContent = `${humid[60]}%`
                    document.getElementById('sh_humid3_16').textContent = `${humid[61]}%`
                    document.getElementById('sh_humid3_17').textContent = `${humid[62]}%`
                    document.getElementById('sh_humid3_18').textContent = `${humid[63]}%`
                    document.getElementById('sh_humid3_19').textContent = `${humid[64]}%`
                    document.getElementById('sh_humid3_20').textContent = `${humid[65]}%`
                    document.getElementById('sh_humid3_21').textContent = `${humid[66]}%`
                    document.getElementById('sh_humid3_22').textContent = `${humid[67]}%`
                    document.getElementById('sh_humid3_23').textContent = `${humid[68]}%`
                    document.getElementById('sh_humid4_0').textContent = `${humid[69]}%`
                }
                if(1==1){ //하늘
                    document.getElementById('sh_sky1_3').textContent = `${sky[0]}`
                    document.getElementById('sh_sky1_4').textContent = `${sky[1]}`
                    document.getElementById('sh_sky1_5').textContent = `${sky[2]}`
                    document.getElementById('sh_sky1_6').textContent = `${sky[3]}`
                    document.getElementById('sh_sky1_7').textContent = `${sky[4]}`
                    document.getElementById('sh_sky1_8').textContent = `${sky[5]}`
                    document.getElementById('sh_sky1_9').textContent = `${sky[6]}`
                    document.getElementById('sh_sky1_10').textContent = `${sky[7]}`
                    document.getElementById('sh_sky1_11').textContent = `${sky[8]}`
                    document.getElementById('sh_sky1_12').textContent = `${sky[9]}`
                    document.getElementById('sh_sky1_13').textContent = `${sky[10]}`
                    document.getElementById('sh_sky1_14').textContent = `${sky[11]}`
                    document.getElementById('sh_sky1_15').textContent = `${sky[12]}`
                    document.getElementById('sh_sky1_16').textContent = `${sky[13]}`
                    document.getElementById('sh_sky1_17').textContent = `${sky[14]}`
                    document.getElementById('sh_sky1_18').textContent = `${sky[15]}`
                    document.getElementById('sh_sky1_19').textContent = `${sky[16]}`
                    document.getElementById('sh_sky1_20').textContent = `${sky[17]}`
                    document.getElementById('sh_sky1_21').textContent = `${sky[18]}`
                    document.getElementById('sh_sky1_22').textContent = `${sky[19]}`
                    document.getElementById('sh_sky1_23').textContent = `${sky[20]}`
                    document.getElementById('sh_sky2_0').textContent = `${sky[21]}`
                    document.getElementById('sh_sky2_1').textContent = `${sky[22]}`
                    document.getElementById('sh_sky2_2').textContent = `${sky[23]}`
                    document.getElementById('sh_sky2_3').textContent = `${sky[24]}`
                    document.getElementById('sh_sky2_4').textContent = `${sky[25]}`
                    document.getElementById('sh_sky2_5').textContent = `${sky[26]}`
                    document.getElementById('sh_sky2_6').textContent = `${sky[27]}`
                    document.getElementById('sh_sky2_7').textContent = `${sky[28]}`
                    document.getElementById('sh_sky2_8').textContent = `${sky[29]}`
                    document.getElementById('sh_sky2_9').textContent = `${sky[30]}`
                    document.getElementById('sh_sky2_10').textContent = `${sky[31]}`
                    document.getElementById('sh_sky2_11').textContent = `${sky[32]}`
                    document.getElementById('sh_sky2_12').textContent = `${sky[33]}`
                    document.getElementById('sh_sky2_13').textContent = `${sky[34]}`
                    document.getElementById('sh_sky2_14').textContent = `${sky[35]}`
                    document.getElementById('sh_sky2_15').textContent = `${sky[36]}`
                    document.getElementById('sh_sky2_16').textContent = `${sky[37]}`
                    document.getElementById('sh_sky2_17').textContent = `${sky[38]}`
                    document.getElementById('sh_sky2_18').textContent = `${sky[39]}`
                    document.getElementById('sh_sky2_19').textContent = `${sky[40]}`
                    document.getElementById('sh_sky2_20').textContent = `${sky[41]}`
                    document.getElementById('sh_sky2_21').textContent = `${sky[42]}`
                    document.getElementById('sh_sky2_22').textContent = `${sky[43]}`
                    document.getElementById('sh_sky2_23').textContent = `${sky[44]}`
                    document.getElementById('sh_sky3_0').textContent = `${sky[45]}`
                    document.getElementById('sh_sky3_1').textContent = `${sky[46]}`
                    document.getElementById('sh_sky3_2').textContent = `${sky[47]}`
                    document.getElementById('sh_sky3_3').textContent = `${sky[48]}`
                    document.getElementById('sh_sky3_4').textContent = `${sky[49]}`
                    document.getElementById('sh_sky3_5').textContent = `${sky[50]}`
                    document.getElementById('sh_sky3_6').textContent = `${sky[51]}`
                    document.getElementById('sh_sky3_7').textContent = `${sky[52]}`
                    document.getElementById('sh_sky3_8').textContent = `${sky[53]}`
                    document.getElementById('sh_sky3_9').textContent = `${sky[54]}`
                    document.getElementById('sh_sky3_10').textContent = `${sky[55]}`
                    document.getElementById('sh_sky3_11').textContent = `${sky[56]}`
                    document.getElementById('sh_sky3_12').textContent = `${sky[57]}`
                    document.getElementById('sh_sky3_13').textContent = `${sky[58]}`
                    document.getElementById('sh_sky3_14').textContent = `${sky[59]}`
                    document.getElementById('sh_sky3_15').textContent = `${sky[60]}`
                    document.getElementById('sh_sky3_16').textContent = `${sky[61]}`
                    document.getElementById('sh_sky3_17').textContent = `${sky[62]}`
                    document.getElementById('sh_sky3_18').textContent = `${sky[63]}`
                    document.getElementById('sh_sky3_19').textContent = `${sky[64]}`
                    document.getElementById('sh_sky3_20').textContent = `${sky[65]}`
                    document.getElementById('sh_sky3_21').textContent = `${sky[66]}`
                    document.getElementById('sh_sky3_22').textContent = `${sky[67]}`
                    document.getElementById('sh_sky3_23').textContent = `${sky[68]}`
                    document.getElementById('sh_sky4_0').textContent = `${sky[69]}`
                }
                if(1==1){ //1시간 강수량
                    document.getElementById('sh_rain1_3').textContent = `${rain[0]}`
                    document.getElementById('sh_rain1_4').textContent = `${rain[1]}`
                    document.getElementById('sh_rain1_5').textContent = `${rain[2]}`
                    document.getElementById('sh_rain1_6').textContent = `${rain[3]}`
                    document.getElementById('sh_rain1_7').textContent = `${rain[4]}`
                    document.getElementById('sh_rain1_8').textContent = `${rain[5]}`
                    document.getElementById('sh_rain1_9').textContent = `${rain[6]}`
                    document.getElementById('sh_rain1_10').textContent = `${rain[7]}`
                    document.getElementById('sh_rain1_11').textContent = `${rain[8]}`
                    document.getElementById('sh_rain1_12').textContent = `${rain[9]}`
                    document.getElementById('sh_rain1_13').textContent = `${rain[10]}`
                    document.getElementById('sh_rain1_14').textContent = `${rain[11]}`
                    document.getElementById('sh_rain1_15').textContent = `${rain[12]}`
                    document.getElementById('sh_rain1_16').textContent = `${rain[13]}`
                    document.getElementById('sh_rain1_17').textContent = `${rain[14]}`
                    document.getElementById('sh_rain1_18').textContent = `${rain[15]}`
                    document.getElementById('sh_rain1_19').textContent = `${rain[16]}`
                    document.getElementById('sh_rain1_20').textContent = `${rain[17]}`
                    document.getElementById('sh_rain1_21').textContent = `${rain[18]}`
                    document.getElementById('sh_rain1_22').textContent = `${rain[19]}`
                    document.getElementById('sh_rain1_23').textContent = `${rain[20]}`
                    document.getElementById('sh_rain2_0').textContent = `${rain[21]}`
                    document.getElementById('sh_rain2_1').textContent = `${rain[22]}`
                    document.getElementById('sh_rain2_2').textContent = `${rain[23]}`
                    document.getElementById('sh_rain2_3').textContent = `${rain[24]}`
                    document.getElementById('sh_rain2_4').textContent = `${rain[25]}`
                    document.getElementById('sh_rain2_5').textContent = `${rain[26]}`
                    document.getElementById('sh_rain2_6').textContent = `${rain[27]}`
                    document.getElementById('sh_rain2_7').textContent = `${rain[28]}`
                    document.getElementById('sh_rain2_8').textContent = `${rain[29]}`
                    document.getElementById('sh_rain2_9').textContent = `${rain[30]}`
                    document.getElementById('sh_rain2_10').textContent = `${rain[31]}`
                    document.getElementById('sh_rain2_11').textContent = `${rain[32]}`
                    document.getElementById('sh_rain2_12').textContent = `${rain[33]}`
                    document.getElementById('sh_rain2_13').textContent = `${rain[34]}`
                    document.getElementById('sh_rain2_14').textContent = `${rain[35]}`
                    document.getElementById('sh_rain2_15').textContent = `${rain[36]}`
                    document.getElementById('sh_rain2_16').textContent = `${rain[37]}`
                    document.getElementById('sh_rain2_17').textContent = `${rain[38]}`
                    document.getElementById('sh_rain2_18').textContent = `${rain[39]}`
                    document.getElementById('sh_rain2_19').textContent = `${rain[40]}`
                    document.getElementById('sh_rain2_20').textContent = `${rain[41]}`
                    document.getElementById('sh_rain2_21').textContent = `${rain[42]}`
                    document.getElementById('sh_rain2_22').textContent = `${rain[43]}`
                    document.getElementById('sh_rain2_23').textContent = `${rain[44]}`
                    document.getElementById('sh_rain3_0').textContent = `${rain[45]}`
                    document.getElementById('sh_rain3_1').textContent = `${rain[46]}`
                    document.getElementById('sh_rain3_2').textContent = `${rain[47]}`
                    document.getElementById('sh_rain3_3').textContent = `${rain[48]}`
                    document.getElementById('sh_rain3_4').textContent = `${rain[49]}`
                    document.getElementById('sh_rain3_5').textContent = `${rain[50]}`
                    document.getElementById('sh_rain3_6').textContent = `${rain[51]}`
                    document.getElementById('sh_rain3_7').textContent = `${rain[52]}`
                    document.getElementById('sh_rain3_8').textContent = `${rain[53]}`
                    document.getElementById('sh_rain3_9').textContent = `${rain[54]}`
                    document.getElementById('sh_rain3_10').textContent = `${rain[55]}`
                    document.getElementById('sh_rain3_11').textContent = `${rain[56]}`
                    document.getElementById('sh_rain3_12').textContent = `${rain[57]}`
                    document.getElementById('sh_rain3_13').textContent = `${rain[58]}`
                    document.getElementById('sh_rain3_14').textContent = `${rain[59]}`
                    document.getElementById('sh_rain3_15').textContent = `${rain[60]}`
                    document.getElementById('sh_rain3_16').textContent = `${rain[61]}`
                    document.getElementById('sh_rain3_17').textContent = `${rain[62]}`
                    document.getElementById('sh_rain3_18').textContent = `${rain[63]}`
                    document.getElementById('sh_rain3_19').textContent = `${rain[64]}`
                    document.getElementById('sh_rain3_20').textContent = `${rain[65]}`
                    document.getElementById('sh_rain3_21').textContent = `${rain[66]}`
                    document.getElementById('sh_rain3_22').textContent = `${rain[67]}`
                    document.getElementById('sh_rain3_23').textContent = `${rain[68]}`
                    document.getElementById('sh_rain4_0').textContent = `${rain[69]}`
                }
                if(1==1){ //확률
                    document.getElementById('sh_rain_per1_3').textContent = `${per[0]}%`
                    document.getElementById('sh_rain_per1_4').textContent = `${per[1]}%`
                    document.getElementById('sh_rain_per1_5').textContent = `${per[2]}%`
                    document.getElementById('sh_rain_per1_6').textContent = `${per[3]}%`
                    document.getElementById('sh_rain_per1_7').textContent = `${per[4]}%`
                    document.getElementById('sh_rain_per1_8').textContent = `${per[5]}%`
                    document.getElementById('sh_rain_per1_9').textContent = `${per[6]}%`
                    document.getElementById('sh_rain_per1_10').textContent = `${per[7]}%`
                    document.getElementById('sh_rain_per1_11').textContent = `${per[8]}%`
                    document.getElementById('sh_rain_per1_12').textContent = `${per[9]}%`
                    document.getElementById('sh_rain_per1_13').textContent = `${per[10]}%`
                    document.getElementById('sh_rain_per1_14').textContent = `${per[11]}%`
                    document.getElementById('sh_rain_per1_15').textContent = `${per[12]}%`
                    document.getElementById('sh_rain_per1_16').textContent = `${per[13]}%`
                    document.getElementById('sh_rain_per1_17').textContent = `${per[14]}%`
                    document.getElementById('sh_rain_per1_18').textContent = `${per[15]}%`
                    document.getElementById('sh_rain_per1_19').textContent = `${per[16]}%`
                    document.getElementById('sh_rain_per1_20').textContent = `${per[17]}%`
                    document.getElementById('sh_rain_per1_21').textContent = `${per[18]}%`
                    document.getElementById('sh_rain_per1_22').textContent = `${per[19]}%`
                    document.getElementById('sh_rain_per1_23').textContent = `${per[20]}%`
                    document.getElementById('sh_rain_per2_0').textContent = `${per[21]}%`
                    document.getElementById('sh_rain_per2_1').textContent = `${per[22]}%`
                    document.getElementById('sh_rain_per2_2').textContent = `${per[23]}%`
                    document.getElementById('sh_rain_per2_3').textContent = `${per[24]}%`
                    document.getElementById('sh_rain_per2_4').textContent = `${per[25]}%`
                    document.getElementById('sh_rain_per2_5').textContent = `${per[26]}%`
                    document.getElementById('sh_rain_per2_6').textContent = `${per[27]}%`
                    document.getElementById('sh_rain_per2_7').textContent = `${per[28]}%`
                    document.getElementById('sh_rain_per2_8').textContent = `${per[29]}%`
                    document.getElementById('sh_rain_per2_9').textContent = `${per[30]}%`
                    document.getElementById('sh_rain_per2_10').textContent = `${per[31]}%`
                    document.getElementById('sh_rain_per2_11').textContent = `${per[32]}%`
                    document.getElementById('sh_rain_per2_12').textContent = `${per[33]}%`
                    document.getElementById('sh_rain_per2_13').textContent = `${per[34]}%`
                    document.getElementById('sh_rain_per2_14').textContent = `${per[35]}%`
                    document.getElementById('sh_rain_per2_15').textContent = `${per[36]}%`
                    document.getElementById('sh_rain_per2_16').textContent = `${per[37]}%`
                    document.getElementById('sh_rain_per2_17').textContent = `${per[38]}%`
                    document.getElementById('sh_rain_per2_18').textContent = `${per[39]}%`
                    document.getElementById('sh_rain_per2_19').textContent = `${per[40]}%`
                    document.getElementById('sh_rain_per2_20').textContent = `${per[41]}%`
                    document.getElementById('sh_rain_per2_21').textContent = `${per[42]}%`
                    document.getElementById('sh_rain_per2_22').textContent = `${per[43]}%`
                    document.getElementById('sh_rain_per2_23').textContent = `${per[44]}%`
                    document.getElementById('sh_rain_per3_0').textContent = `${per[45]}%`
                    document.getElementById('sh_rain_per3_1').textContent = `${per[46]}%`
                    document.getElementById('sh_rain_per3_2').textContent = `${per[47]}%`
                    document.getElementById('sh_rain_per3_3').textContent = `${per[48]}%`
                    document.getElementById('sh_rain_per3_4').textContent = `${per[49]}%`
                    document.getElementById('sh_rain_per3_5').textContent = `${per[50]}%`
                    document.getElementById('sh_rain_per3_6').textContent = `${per[51]}%`
                    document.getElementById('sh_rain_per3_7').textContent = `${per[52]}%`
                    document.getElementById('sh_rain_per3_8').textContent = `${per[53]}%`
                    document.getElementById('sh_rain_per3_9').textContent = `${per[54]}%`
                    document.getElementById('sh_rain_per3_10').textContent = `${per[55]}%`
                    document.getElementById('sh_rain_per3_11').textContent = `${per[56]}%`
                    document.getElementById('sh_rain_per3_12').textContent = `${per[57]}%`
                    document.getElementById('sh_rain_per3_13').textContent = `${per[58]}%`
                    document.getElementById('sh_rain_per3_14').textContent = `${per[59]}%`
                    document.getElementById('sh_rain_per3_15').textContent = `${per[60]}%`
                    document.getElementById('sh_rain_per3_16').textContent = `${per[61]}%`
                    document.getElementById('sh_rain_per3_17').textContent = `${per[62]}%`
                    document.getElementById('sh_rain_per3_18').textContent = `${per[63]}%`
                    document.getElementById('sh_rain_per3_19').textContent = `${per[64]}%`
                    document.getElementById('sh_rain_per3_20').textContent = `${per[65]}%`
                    document.getElementById('sh_rain_per3_21').textContent = `${per[66]}%`
                    document.getElementById('sh_rain_per3_22').textContent = `${per[67]}%`
                    document.getElementById('sh_rain_per3_23').textContent = `${per[68]}%`
                    document.getElementById('sh_rain_per4_0').textContent = `${per[69]}%`
                }
                if(1==1){ //형태
                    document.getElementById('sh_rain_form1_3').textContent = `${form[0]}`
                    document.getElementById('sh_rain_form1_4').textContent = `${form[1]}`
                    document.getElementById('sh_rain_form1_5').textContent = `${form[2]}`
                    document.getElementById('sh_rain_form1_6').textContent = `${form[3]}`
                    document.getElementById('sh_rain_form1_7').textContent = `${form[4]}`
                    document.getElementById('sh_rain_form1_8').textContent = `${form[5]}`
                    document.getElementById('sh_rain_form1_9').textContent = `${form[6]}`
                    document.getElementById('sh_rain_form1_10').textContent = `${form[7]}`
                    document.getElementById('sh_rain_form1_11').textContent = `${form[8]}`
                    document.getElementById('sh_rain_form1_12').textContent = `${form[9]}`
                    document.getElementById('sh_rain_form1_13').textContent = `${form[10]}`
                    document.getElementById('sh_rain_form1_14').textContent = `${form[11]}`
                    document.getElementById('sh_rain_form1_15').textContent = `${form[12]}`
                    document.getElementById('sh_rain_form1_16').textContent = `${form[13]}`
                    document.getElementById('sh_rain_form1_17').textContent = `${form[14]}`
                    document.getElementById('sh_rain_form1_18').textContent = `${form[15]}`
                    document.getElementById('sh_rain_form1_19').textContent = `${form[16]}`
                    document.getElementById('sh_rain_form1_20').textContent = `${form[17]}`
                    document.getElementById('sh_rain_form1_21').textContent = `${form[18]}`
                    document.getElementById('sh_rain_form1_22').textContent = `${form[19]}`
                    document.getElementById('sh_rain_form1_23').textContent = `${form[20]}`
                    document.getElementById('sh_rain_form2_0').textContent = `${form[21]}`
                    document.getElementById('sh_rain_form2_1').textContent = `${form[22]}`
                    document.getElementById('sh_rain_form2_2').textContent = `${form[23]}`
                    document.getElementById('sh_rain_form2_3').textContent = `${form[24]}`
                    document.getElementById('sh_rain_form2_4').textContent = `${form[25]}`
                    document.getElementById('sh_rain_form2_5').textContent = `${form[26]}`
                    document.getElementById('sh_rain_form2_6').textContent = `${form[27]}`
                    document.getElementById('sh_rain_form2_7').textContent = `${form[28]}`
                    document.getElementById('sh_rain_form2_8').textContent = `${form[29]}`
                    document.getElementById('sh_rain_form2_9').textContent = `${form[30]}`
                    document.getElementById('sh_rain_form2_10').textContent = `${form[31]}`
                    document.getElementById('sh_rain_form2_11').textContent = `${form[32]}`
                    document.getElementById('sh_rain_form2_12').textContent = `${form[33]}`
                    document.getElementById('sh_rain_form2_13').textContent = `${form[34]}`
                    document.getElementById('sh_rain_form2_14').textContent = `${form[35]}`
                    document.getElementById('sh_rain_form2_15').textContent = `${form[36]}`
                    document.getElementById('sh_rain_form2_16').textContent = `${form[37]}`
                    document.getElementById('sh_rain_form2_17').textContent = `${form[38]}`
                    document.getElementById('sh_rain_form2_18').textContent = `${form[39]}`
                    document.getElementById('sh_rain_form2_19').textContent = `${form[40]}`
                    document.getElementById('sh_rain_form2_20').textContent = `${form[41]}`
                    document.getElementById('sh_rain_form2_21').textContent = `${form[42]}`
                    document.getElementById('sh_rain_form2_22').textContent = `${form[43]}`
                    document.getElementById('sh_rain_form2_23').textContent = `${form[44]}`
                    document.getElementById('sh_rain_form3_0').textContent = `${form[45]}`
                    document.getElementById('sh_rain_form3_1').textContent = `${form[46]}`
                    document.getElementById('sh_rain_form3_2').textContent = `${form[47]}`
                    document.getElementById('sh_rain_form3_3').textContent = `${form[48]}`
                    document.getElementById('sh_rain_form3_4').textContent = `${form[49]}`
                    document.getElementById('sh_rain_form3_5').textContent = `${form[50]}`
                    document.getElementById('sh_rain_form3_6').textContent = `${form[51]}`
                    document.getElementById('sh_rain_form3_7').textContent = `${form[52]}`
                    document.getElementById('sh_rain_form3_8').textContent = `${form[53]}`
                    document.getElementById('sh_rain_form3_9').textContent = `${form[54]}`
                    document.getElementById('sh_rain_form3_10').textContent = `${form[55]}`
                    document.getElementById('sh_rain_form3_11').textContent = `${form[56]}`
                    document.getElementById('sh_rain_form3_12').textContent = `${form[57]}`
                    document.getElementById('sh_rain_form3_13').textContent = `${form[58]}`
                    document.getElementById('sh_rain_form3_14').textContent = `${form[59]}`
                    document.getElementById('sh_rain_form3_15').textContent = `${form[60]}`
                    document.getElementById('sh_rain_form3_16').textContent = `${form[61]}`
                    document.getElementById('sh_rain_form3_17').textContent = `${form[62]}`
                    document.getElementById('sh_rain_form3_18').textContent = `${form[63]}`
                    document.getElementById('sh_rain_form3_19').textContent = `${form[64]}`
                    document.getElementById('sh_rain_form3_20').textContent = `${form[65]}`
                    document.getElementById('sh_rain_form3_21').textContent = `${form[66]}`
                    document.getElementById('sh_rain_form3_22').textContent = `${form[67]}`
                    document.getElementById('sh_rain_form3_23').textContent = `${form[68]}`
                    document.getElementById('sh_rain_form4_0').textContent = `${form[69]}`
                }
                if(1==1){ //형태
                    document.getElementById('sh_new_snow1_3').textContent = `${snow[0]}`
                    document.getElementById('sh_new_snow1_4').textContent = `${snow[1]}`
                    document.getElementById('sh_new_snow1_5').textContent = `${snow[2]}`
                    document.getElementById('sh_new_snow1_6').textContent = `${snow[3]}`
                    document.getElementById('sh_new_snow1_7').textContent = `${snow[4]}`
                    document.getElementById('sh_new_snow1_8').textContent = `${snow[5]}`
                    document.getElementById('sh_new_snow1_9').textContent = `${snow[6]}`
                    document.getElementById('sh_new_snow1_10').textContent = `${snow[7]}`
                    document.getElementById('sh_new_snow1_11').textContent = `${snow[8]}`
                    document.getElementById('sh_new_snow1_12').textContent = `${snow[9]}`
                    document.getElementById('sh_new_snow1_13').textContent = `${snow[10]}`
                    document.getElementById('sh_new_snow1_14').textContent = `${snow[11]}`
                    document.getElementById('sh_new_snow1_15').textContent = `${snow[12]}`
                    document.getElementById('sh_new_snow1_16').textContent = `${snow[13]}`
                    document.getElementById('sh_new_snow1_17').textContent = `${snow[14]}`
                    document.getElementById('sh_new_snow1_18').textContent = `${snow[15]}`
                    document.getElementById('sh_new_snow1_19').textContent = `${snow[16]}`
                    document.getElementById('sh_new_snow1_20').textContent = `${snow[17]}`
                    document.getElementById('sh_new_snow1_21').textContent = `${snow[18]}`
                    document.getElementById('sh_new_snow1_22').textContent = `${snow[19]}`
                    document.getElementById('sh_new_snow1_23').textContent = `${snow[20]}`
                    document.getElementById('sh_new_snow2_0').textContent = `${snow[21]}`
                    document.getElementById('sh_new_snow2_1').textContent = `${snow[22]}`
                    document.getElementById('sh_new_snow2_2').textContent = `${snow[23]}`
                    document.getElementById('sh_new_snow2_3').textContent = `${snow[24]}`
                    document.getElementById('sh_new_snow2_4').textContent = `${snow[25]}`
                    document.getElementById('sh_new_snow2_5').textContent = `${snow[26]}`
                    document.getElementById('sh_new_snow2_6').textContent = `${snow[27]}`
                    document.getElementById('sh_new_snow2_7').textContent = `${snow[28]}`
                    document.getElementById('sh_new_snow2_8').textContent = `${snow[29]}`
                    document.getElementById('sh_new_snow2_9').textContent = `${snow[30]}`
                    document.getElementById('sh_new_snow2_10').textContent = `${snow[31]}`
                    document.getElementById('sh_new_snow2_11').textContent = `${snow[32]}`
                    document.getElementById('sh_new_snow2_12').textContent = `${snow[33]}`
                    document.getElementById('sh_new_snow2_13').textContent = `${snow[34]}`
                    document.getElementById('sh_new_snow2_14').textContent = `${snow[35]}`
                    document.getElementById('sh_new_snow2_15').textContent = `${snow[36]}`
                    document.getElementById('sh_new_snow2_16').textContent = `${snow[37]}`
                    document.getElementById('sh_new_snow2_17').textContent = `${snow[38]}`
                    document.getElementById('sh_new_snow2_18').textContent = `${snow[39]}`
                    document.getElementById('sh_new_snow2_19').textContent = `${snow[40]}`
                    document.getElementById('sh_new_snow2_20').textContent = `${snow[41]}`
                    document.getElementById('sh_new_snow2_21').textContent = `${snow[42]}`
                    document.getElementById('sh_new_snow2_22').textContent = `${snow[43]}`
                    document.getElementById('sh_new_snow2_23').textContent = `${snow[44]}`
                    document.getElementById('sh_new_snow3_0').textContent = `${snow[45]}`
                    document.getElementById('sh_new_snow3_1').textContent = `${snow[46]}`
                    document.getElementById('sh_new_snow3_2').textContent = `${snow[47]}`
                    document.getElementById('sh_new_snow3_3').textContent = `${snow[48]}`
                    document.getElementById('sh_new_snow3_4').textContent = `${snow[49]}`
                    document.getElementById('sh_new_snow3_5').textContent = `${snow[50]}`
                    document.getElementById('sh_new_snow3_6').textContent = `${snow[51]}`
                    document.getElementById('sh_new_snow3_7').textContent = `${snow[52]}`
                    document.getElementById('sh_new_snow3_8').textContent = `${snow[53]}`
                    document.getElementById('sh_new_snow3_9').textContent = `${snow[54]}`
                    document.getElementById('sh_new_snow3_10').textContent = `${snow[55]}`
                    document.getElementById('sh_new_snow3_11').textContent = `${snow[56]}`
                    document.getElementById('sh_new_snow3_12').textContent = `${snow[57]}`
                    document.getElementById('sh_new_snow3_13').textContent = `${snow[58]}`
                    document.getElementById('sh_new_snow3_14').textContent = `${snow[59]}`
                    document.getElementById('sh_new_snow3_15').textContent = `${snow[60]}`
                    document.getElementById('sh_new_snow3_16').textContent = `${snow[61]}`
                    document.getElementById('sh_new_snow3_17').textContent = `${snow[62]}`
                    document.getElementById('sh_new_snow3_18').textContent = `${snow[63]}`
                    document.getElementById('sh_new_snow3_19').textContent = `${snow[64]}`
                    document.getElementById('sh_new_snow3_20').textContent = `${snow[65]}`
                    document.getElementById('sh_new_snow3_21').textContent = `${snow[66]}`
                    document.getElementById('sh_new_snow3_22').textContent = `${snow[67]}`
                    document.getElementById('sh_new_snow3_23').textContent = `${snow[68]}`
                    document.getElementById('sh_new_snow4_0').textContent = `${snow[69]}`
                }
            }
        }
        // console.log(now_temp)
        var now = [min_temp, now_temp, max_temp];
        now_chart.data.datasets[0].data = now;
        now_chart.update();
    }
    var info_xhr = new XMLHttpRequest();
    var info_url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent(area_code); /**/
    queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 1); /**/
    queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
    info_xhr.open('GET', info_url + queryParams);
    info_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            try {
                var info_loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('weather_info').textContent = '에러 발생.'
            }
            if (info_loaded.response.header.resultCode = "00") {
                var info_main = info_loaded.response.body.items.item;
                var yyyymmdd = String(info_main[0].tmFc);
                var year = yyyymmdd.slice(0, 4);
                var month = yyyymmdd.slice(4, 6);
                var date = yyyymmdd.slice(6, 8);
                var hour = yyyymmdd.slice(8, 10);
                var minute = yyyymmdd.slice(10, 12);
                document.getElementById('info_time').textContent = `${month}월 ${date}일 ${hour}시 ${minute}분 발표`
                document.getElementById('weather_info').textContent = (info_main[0].t1).slice(0, -4)
            }
        }
    };
    // var sokbo_xhr = new XMLHttpRequest();
    // var sokbo_url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrBrkNews'; /*URL*/
    // var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    // queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    // queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent(108); /**/
    // queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 1); /**/
    // queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
    // sokbo_xhr.open('GET', sokbo_url + queryParams);
    // console.log(sokbo_url+queryParams)
    // sokbo_xhr.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         try {
    //             var sokbo_loaded = JSON.parse(this.responseText);
    //         } catch (error) {
    //             document.getElementById('weather_sokbo').textContent = '에러 발생.'
    //         }
    //         if(sokbo_loaded.response.header.resultCode = '00'){
    //             var sokbo_main = sokbo_loaded.body.items.item
    //             var yyyymmdd = String(sokbo_main[0].tmFc);
    //             var year = yyyymmdd.slice(0, 4);
    //             var month = yyyymmdd.slice(4, 6);
    //             var date = yyyymmdd.slice(6, 8);
    //             var hour = yyyymmdd.slice(8, 10);
    //             var minute = yyyymmdd.slice(10, 12);
    //             console.log(month + date + hour + minute)
    //             document.getElementById('sokbo_time').textContent = `${month}월 ${date}일 ${hour}시 ${minute}분 발표`
    //             document.getElementById('weather_sokbo').textContent = sokbo_main[0].t1
    //         }
    //     }
    // };
    var mid_xhr = new XMLHttpRequest();
    var mid_url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst'; /*URL*/
    var mid_queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    mid_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    mid_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    mid_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    mid_queryParams += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent(yuksang); /**/
    mid_queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(getToday()+blabla); /**/
    mid_xhr.open('GET', mid_url + mid_queryParams);
    mid_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(mid_url+mid_queryParams);
            try {
                var mid_loaded = JSON.parse(this.responseText);
            } catch (error) {
                // document.getElementById('weather_info').textContent = '에러 발생.'
            }
            if (mid_loaded.response.header.resultCode = "00") {
                var mid_main = mid_loaded.response.body.items.item[0];
                document.getElementById('mid_rain1').textContent = `${mid_main.rnSt3Am}%→${mid_main.rnSt3Pm}%`
                document.getElementById('mid_rain2').textContent = `${mid_main.rnSt4Am}%→${mid_main.rnSt4Pm}%`
                document.getElementById('mid_rain3').textContent = `${mid_main.rnSt5Am}%→${mid_main.rnSt5Pm}%`
                document.getElementById('mid_rain4').textContent = `${mid_main.rnSt6Am}%→${mid_main.rnSt6Pm}%`
                document.getElementById('mid_rain5').textContent = `${mid_main.rnSt7Am}%→${mid_main.rnSt7Pm}%`
                document.getElementById('mid_rain6').textContent = `${mid_main.rnSt8}%`
                document.getElementById('mid_rain7').textContent = `${mid_main.rnSt9}%`
                document.getElementById('mid_rain8').textContent = `${mid_main.rnSt10}%`

                document.getElementById('mid_weather1').textContent = `${mid_main.wf3Am}→${mid_main.wf3Pm}`
                document.getElementById('mid_weather2').textContent = `${mid_main.wf4Am}→${mid_main.wf4Pm}`
                document.getElementById('mid_weather3').textContent = `${mid_main.wf5Am}→${mid_main.wf5Pm}`
                document.getElementById('mid_weather4').textContent = `${mid_main.wf6Am}→${mid_main.wf6Pm}`
                document.getElementById('mid_weather5').textContent = `${mid_main.wf7Am}→${mid_main.wf7Pm}`
                document.getElementById('mid_weather6').textContent = mid_main.wf8
                document.getElementById('mid_weather7').textContent = mid_main.wf9
                document.getElementById('mid_weather8').textContent = mid_main.wf10

            }
        }
    };
    var mid_temp_xhr = new XMLHttpRequest();
    var mid_temp_url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa'; /*URL*/
    var mid_temp_queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    mid_temp_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    mid_temp_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    mid_temp_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    mid_temp_queryParams += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent(ma); /**/
    mid_temp_queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(getToday()+blabla); /**/
    mid_temp_xhr.open('GET', mid_temp_url + mid_temp_queryParams);
    mid_temp_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // console.log(mid_temp_url+mid_temp_queryParams);
            try {
                var mid_temp_loaded = JSON.parse(this.responseText);
            } catch (error) {
                // document.getElementById('weather_info').textContent = '에러 발생.'
            }
            if (mid_temp_loaded.response.header.resultCode = "00") {
                var mid_temp_main = mid_temp_loaded.response.body.items.item[0];
                document.getElementById('mid_max1').textContent = `${mid_temp_main.taMax3}℃`
                document.getElementById('mid_max2').textContent = `${mid_temp_main.taMax4}℃`
                document.getElementById('mid_max3').textContent = `${mid_temp_main.taMax5}℃`
                document.getElementById('mid_max4').textContent = `${mid_temp_main.taMax6}℃`
                document.getElementById('mid_max5').textContent = `${mid_temp_main.taMax7}℃`
                document.getElementById('mid_max6').textContent = `${mid_temp_main.taMax8}℃`
                document.getElementById('mid_max7').textContent = `${mid_temp_main.taMax9}℃`
                document.getElementById('mid_max8').textContent = `${mid_temp_main.taMax10}℃`

                document.getElementById('mid_min1').textContent = `${mid_temp_main.taMin3}℃`
                document.getElementById('mid_min2').textContent = `${mid_temp_main.taMin4}℃`
                document.getElementById('mid_min3').textContent = `${mid_temp_main.taMin5}℃`
                document.getElementById('mid_min4').textContent = `${mid_temp_main.taMin6}℃`
                document.getElementById('mid_min5').textContent = `${mid_temp_main.taMin7}℃`
                document.getElementById('mid_min6').textContent = `${mid_temp_main.taMin8}℃`
                document.getElementById('mid_min7').textContent = `${mid_temp_main.taMin9}℃`
                document.getElementById('mid_min8').textContent = `${mid_temp_main.taMin10}℃`

            }
        }
    };
    
    var mid_msg_xhr = new XMLHttpRequest();
    var mid_msg_url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst'; /*URL*/
    var mid_msg_queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    mid_msg_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    mid_msg_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    mid_msg_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    mid_msg_queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent(area_code); /**/
    mid_msg_queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(getToday()+blabla); /**/
    mid_msg_xhr.open('GET', mid_msg_url + mid_msg_queryParams);
    mid_msg_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log('이거임 : ' + mid_msg_url+mid_msg_queryParams);
            try {
                var mid_msg_loaded = JSON.parse(this.responseText);
            } catch (error) {
                // document.getElementById('weather_info').textContent = '에러 발생.'
            }
            if (mid_msg_loaded.response.header.resultCode = "00") {
                document.getElementById('mid_info').textContent = mid_msg_loaded.response.body.items.item[0].wfSv

                var yyyymmdd = getToday()
                var month = yyyymmdd.slice(4, 6);
                var date = yyyymmdd.slice(6, 8);
                var hour =blabla.slice(0, 2);
                document.getElementById('mid_info_time').textContent = `${month}월 ${date}일 ${hour}시 00분 발표`
            }
        }
    };
    ultra_now_xhr.send('');
    ultra_fore_xhr.send('');
    fore_xhr.send('');
    info_xhr.send('')
    // sokbo_xhr.send('');
    mid_xhr.send('');
    mid_temp_xhr.send('')
    mid_msg_xhr.send('')
})
document.getElementById('ultra_time1').textContent = `${today.getHours()}시`
let date = new Date();
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time2').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time3').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time4').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time5').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time6').textContent = `${String(date).slice(16, 18)}시`;

let sh_day = new Date();
document.getElementById('sh_time1_3').textContent = `${String(sh_day).slice(8,10)}일 03시`
document.getElementById('sh_time1_4').textContent = `04시`
document.getElementById('sh_time1_5').textContent = `05시`
document.getElementById('sh_time1_6').textContent = `06시`
document.getElementById('sh_time1_7').textContent = `07시`
document.getElementById('sh_time1_8').textContent = `08시`
document.getElementById('sh_time1_9').textContent = `09시`
document.getElementById('sh_time1_10').textContent = `10시`
document.getElementById('sh_time1_11').textContent = `11시`
document.getElementById('sh_time1_12').textContent = `12시`
document.getElementById('sh_time1_13').textContent = `13시`
document.getElementById('sh_time1_14').textContent = `14시`
document.getElementById('sh_time1_15').textContent = `15시`
document.getElementById('sh_time1_16').textContent = `16시`
document.getElementById('sh_time1_17').textContent = `17시`
document.getElementById('sh_time1_18').textContent = `18시`
document.getElementById('sh_time1_19').textContent = `18시`
document.getElementById('sh_time1_20').textContent = `20시`
document.getElementById('sh_time1_21').textContent = `21시`
document.getElementById('sh_time1_22').textContent = `23시`
document.getElementById('sh_time1_23').textContent = `23시`
sh_day.setDate(sh_day.getDate()+1)
document.getElementById('sh_time2_0').textContent = `${String(sh_day).slice(8,10)}일 00시`
document.getElementById('sh_time2_1').textContent = `01시`
document.getElementById('sh_time2_2').textContent = `02시`
document.getElementById('sh_time2_3').textContent = `03시`
document.getElementById('sh_time2_4').textContent = `04시`
document.getElementById('sh_time2_5').textContent = `05시`
document.getElementById('sh_time2_6').textContent = `06시`
document.getElementById('sh_time2_7').textContent = `07시`
document.getElementById('sh_time2_8').textContent = `08시`
document.getElementById('sh_time2_9').textContent = `09시`
document.getElementById('sh_time2_10').textContent = `10시`
document.getElementById('sh_time2_11').textContent = `11시`
document.getElementById('sh_time2_12').textContent = `12시`
document.getElementById('sh_time2_13').textContent = `13시`
document.getElementById('sh_time2_14').textContent = `14시`
document.getElementById('sh_time2_15').textContent = `15시`
document.getElementById('sh_time2_16').textContent = `16시`
document.getElementById('sh_time2_17').textContent = `17시`
document.getElementById('sh_time2_18').textContent = `18시`
document.getElementById('sh_time2_19').textContent = `18시`
document.getElementById('sh_time2_20').textContent = `20시`
document.getElementById('sh_time2_21').textContent = `21시`
document.getElementById('sh_time2_22').textContent = `23시`
document.getElementById('sh_time2_23').textContent = `23시`
sh_day.setDate(sh_day.getDate()+1)
document.getElementById('sh_time3_0').textContent = `${String(sh_day).slice(8,10)}일 00시`
document.getElementById('sh_time3_1').textContent = `01시`
document.getElementById('sh_time3_2').textContent = `02시`
document.getElementById('sh_time3_3').textContent = `03시`
document.getElementById('sh_time3_4').textContent = `04시`
document.getElementById('sh_time3_5').textContent = `05시`
document.getElementById('sh_time3_6').textContent = `06시`
document.getElementById('sh_time3_7').textContent = `07시`
document.getElementById('sh_time3_8').textContent = `08시`
document.getElementById('sh_time3_9').textContent = `09시`
document.getElementById('sh_time3_10').textContent = `10시`
document.getElementById('sh_time3_11').textContent = `11시`
document.getElementById('sh_time3_12').textContent = `12시`
document.getElementById('sh_time3_13').textContent = `13시`
document.getElementById('sh_time3_14').textContent = `14시`
document.getElementById('sh_time3_15').textContent = `15시`
document.getElementById('sh_time3_16').textContent = `16시`
document.getElementById('sh_time3_17').textContent = `17시`
document.getElementById('sh_time3_18').textContent = `18시`
document.getElementById('sh_time3_19').textContent = `18시`
document.getElementById('sh_time3_20').textContent = `20시`
document.getElementById('sh_time3_21').textContent = `21시`
document.getElementById('sh_time3_22').textContent = `23시`
document.getElementById('sh_time3_23').textContent = `23시`
sh_day.setDate(sh_day.getDate()+1)
document.getElementById('sh_time4_0').textContent = `${String(sh_day).slice(8,10)}일 00시`


let day = new Date();
day.setDate(day.getDate()+2);
document.getElementById('mid_day1').textContent = `${String(day).slice(8,10)}일 오전/오후`
day.setDate(day.getDate()+1);
document.getElementById('mid_day2').textContent = `${String(day).slice(8,10)}일 오전/오후`
day.setDate(day.getDate()+1);
document.getElementById('mid_day3').textContent = `${String(day).slice(8,10)}일 오전/오후`
day.setDate(day.getDate()+1);
document.getElementById('mid_day4').textContent = `${String(day).slice(8,10)}일 오전/오후`
day.setDate(day.getDate()+1);
document.getElementById('mid_day5').textContent = `${String(day).slice(8,10)}일 오전/오후`
day.setDate(day.getDate()+1);
document.getElementById('mid_day6').textContent = `${String(day).slice(8,10)}일`
day.setDate(day.getDate()+1);
document.getElementById('mid_day7').textContent = `${String(day).slice(8,10)}일`
day.setDate(day.getDate()+1);
document.getElementById('mid_day8').textContent = `${String(day).slice(8,10)}일`