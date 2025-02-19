NEXT JS 이용하여 인증을 관리하고,

accessToken : 클라이언트 상태로 Provider에 저장.
refreshToken : cookie에 저장 (server Action이 set cookie)

DB : 테이블 ( 유저정보테이블만 있음)

현재 된 것 : 로그인, 회원가입, 로그아웃 관리 ( supabase )
이제 할 것 :

로그인된 user에 따라 해당 user의 카트정보를 가져오기.

- [x] cart라는 DB테이블추가 (외래키로 userId를 갖게)
- token에서 getUser()하여 user를 얻고, 다음 getCart() 서버액션을 통해 DB호출을 통해 연결
- subsequent 서버액션은 어떻게 구현할것인가? 그냥 if분기처리로.?

서버액션함수로 중요로직들을 구현했었음 (supabase)
// accessToken : 상태관리

- auth 하나때문에 큰덩어리페이지를 클라이언트컴포넌트로...
- 클라이언트컴포넌트에서는 서버액션을 호출할 수가 없음.
  // refreshToken : 쿠키로.
