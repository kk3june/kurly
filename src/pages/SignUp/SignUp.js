import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { SIGN_UP_API, SIGN_UP_CHECK_API } from "../../config";
import "./SignUp.scss";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      password: "",
      email: "",
      phoneNumber: "",
      address: "",
      gender: "",
      usableId: false,
      isIdshowing: false,
      isPwshowing: false,
      isPwCheckshowing: false,
      isIdColor: false,
      isPwColor: false,
      isPwCheckColor: false,
      isPwReCheckColor: false,
      checkBtn: false,
    };
  }

  handleShowInputCondition = e => {
    this.setState({
      isIdShowing: true,
    });
  };

  handleShowPwInputCondition = e => {
    this.setState({
      isPwShowing: true,
    });
  };

  handleShowPwCheckInputCondition = e => {
    this.setState({
      isPwCheckShowing: true,
    });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleBtnColor = e => {
    e.preventDefault();
    this.setState({
      checkBtn: !this.state.checkBtn,
    });
  };

  handleIdPassCondition = e => {
    const idCheck = /^[a-z]+[a-z0-9]{5,16}$/;

    if (e.target.value.length > 5 && idCheck.test(e.target.value)) {
      this.setState({
        isIdColor: true,
      });
    } else {
      this.setState({
        isIdColor: false,
      });
    }
  };

  handlePwPassCondition = e => {
    if (e.target.value.length > 9) {
      this.setState({
        isPwColor: true,
      });
    } else {
      this.setState({
        isPwColor: false,
      });
    }

    const pwCheck =
      /^(?=.*[A-Z])(?=.*[0-9])(?!.*?\d{4})(?=.*[a-z])(?=.*[!@#$%^*+=-]).{9,16}$/;

    if (pwCheck.test(e.target.value)) {
      this.setState({
        isPwCheckColor: true,
      });
    } else {
      this.setState({
        isPwCheckColor: false,
      });
    }
  };

  handlePwCheck = e => {
    if (this.state.password === e.target.value) {
      this.setState({
        isPwReCheckColor: true,
      });
    } else {
      this.setState({
        isPwReCheckColor: false,
      });
    }
  };

  checkDuplicationId = e => {
    e.preventDefault();
    fetch(SIGN_UP_CHECK_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account_name: this.state.id }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "POSSIBLE") {
          alert("?????? ?????? ????????? ??????????????????.");
          this.setState({ usableId: true });
        } else if (res.message === "EXIST_USER") {
          alert("?????? ?????? ?????? ??????????????????. ?????? ???????????? ??????????????????.");
        }
      });
  };

  handleSignup = () => {
    const {
      id,
      password,
      name,
      email,
      phoneNumber,
      address,
      gender,
      birthYear,
      birthMonth,
      birthDate,
    } = this.state;
    fetch(SIGN_UP_API, {
      method: "POST",
      body: JSON.stringify({
        account_name: id,
        password: password,
        name: name,
        email: email,
        phone_number: phoneNumber,
        address: address,
        gender: gender,
        date_of_birth: `${birthYear}-${birthMonth}-${birthDate}`,
      }),
    })
      .then(res => res.json())
      .then(res => {
        const messages = {
          SUCCESS: `${this.state.id}??? ???????????????. ??????????????? ?????? ?????? ???????????????!`,
          INVALID_ACCOUNT:
            "????????? ???????????????. ???????????? ????????? ?????? ?????? ??????????????????.",
          INVALID_PASSWORD:
            "????????? ???????????????. ??????????????? ????????? ?????? ?????? ??????????????????.",
          INVALID_EMAIL:
            "????????? ???????????????. ???????????? ????????? ?????? ?????? ??????????????????.",
        };
        alert(messages[res.message]);
        console.log(res);

        if (res.message === "SUCCESS") {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    const {
      isIdShowing,
      isPwShowing,
      isPwCheckShowing,
      isIdColor,
      isPwColor,
      isPwCheckColor,
      isPwReCheckColor,
    } = this.state;
    let btnStatus = this.state.checkBtn ? "check" : "uncheck";
    return (
      <div className="signUp">
        <main>
          <div className="formHeader">
            <h1>????????????</h1>
            <p className="requirement">??????????????????</p>
          </div>
          <form className="form" onChange={this.handleInput}>
            <table>
              <tbody>
                <tr>
                  <th className="requiredCategory">?????????</th>
                  <td className="conditionContainer">
                    <div>
                      <input
                        onClick={this.handleShowInputCondition}
                        onChange={this.handleIdPassCondition}
                        type="text"
                        name="id"
                        autoComplete="off"
                        placeholder="6??? ????????? ?????? ?????? ????????? ????????? ??????"
                      />
                      <button type="button" onClick={this.checkDuplicationId}>
                        ????????????
                      </button>
                    </div>
                    {isIdShowing && (
                      <div className="inputConditionWrapper">
                        <p
                          className="inputCondition"
                          style={{
                            color:
                              this.state.id === ""
                                ? "black"
                                : isIdColor === false
                                ? "red"
                                : "green",
                          }}
                        >
                          6??? ????????? ?????? ?????? ????????? ????????? ??????(???????????? ??????)
                        </p>
                        <p
                          className="inputCondition"
                          style={{
                            color:
                              this.state.id === ""
                                ? "black"
                                : this.state.usableId === false
                                ? "red"
                                : "green",
                          }}
                        >
                          ????????? ????????????
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="requiredCategory">????????????</th>
                  <td className="conditionContainer">
                    <input
                      onClick={this.handleShowPwInputCondition}
                      onChange={this.handlePwPassCondition}
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="??????????????? ??????????????????"
                    />
                    {isPwShowing && (
                      <div className="inputConditionWrapper">
                        <p
                          className="inputCondition"
                          style={{
                            color:
                              this.state.password === ""
                                ? "black"
                                : isPwColor === false
                                ? "red"
                                : "green",
                          }}
                        >
                          10??? ?????? ??????
                        </p>
                        <p
                          className="inputCondition"
                          style={{
                            color:
                              this.state.password === ""
                                ? "black"
                                : isPwCheckColor === false
                                ? "red"
                                : "green",
                          }}
                        >
                          ?????? ????????????/??????/????????????(?????? ??????)??? ????????????, 2???
                          ?????? ??????
                        </p>
                        <p
                          className="inputCondition"
                          style={{
                            color:
                              this.state.password === ""
                                ? "black"
                                : isPwCheckColor === false
                                ? "red"
                                : "green",
                          }}
                        >
                          ????????? ?????? 3??? ?????? ?????? ?????? ??????
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="requiredCategory">??????????????????</th>
                  <td className="conditionContainer">
                    <input
                      onClick={this.handleShowPwCheckInputCondition}
                      onChange={this.handlePwCheck}
                      type="password"
                      name="rePassword"
                      autoComplete="off"
                      placeholder="??????????????? ?????? ??? ??????????????????"
                    />
                    {isPwCheckShowing && (
                      <div className="inputConditionWrapper">
                        <p
                          className="inputCondition"
                          style={{
                            color:
                              this.state.rePassword === ""
                                ? "black"
                                : isPwReCheckColor === false
                                ? "red"
                                : "green",
                          }}
                        >
                          ????????? ??????????????? ??????????????????.
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="requiredCategory">??????</th>
                  <td>
                    <input
                      type="text"
                      name="name"
                      placeholder="????????? ??????????????????"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="requiredCategory">?????????</th>
                  <td>
                    <input
                      type="email"
                      name="email"
                      placeholder="???: byeolbammarket@bb.com"
                    />
                    <button type="button">????????????</button>
                  </td>
                </tr>
                <tr>
                  <th className="requiredCategory">?????????</th>
                  <td>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="????????? ??????????????????"
                    />
                    <button type="button">???????????? ??????</button>
                  </td>
                </tr>
                <tr>
                  <th className="requiredCategory">??????</th>
                  <td className="address">
                    <input
                      type="text"
                      name="address"
                      placeholder="???: ????????? ????????? ???????????? 427, 3??? ????????????"
                    />
                    <div>
                      <div className="inputConditionWrapper">
                        <p className="inputDescription">
                          ???????????? ?????? ?????? ????????? ????????? ??? ????????????.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>??????</th>
                  <td>
                    <div className="options">
                      <div className="genderOptions">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                        />
                        <label htmlFor="male" className="genderOption">
                          ??????
                        </label>
                      </div>
                      <div className="genderOptions">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                        />
                        <label htmlFor="female" className="genderOption">
                          ??????
                        </label>
                      </div>
                      <div className="genderOptions">
                        <input
                          type="radio"
                          id="noSelect"
                          name="gender"
                          value="noSelect"
                          defaultChecked
                        />
                        <label htmlFor="noSelect" className="genderOption">
                          ????????????
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>????????????</th>
                  <td>
                    <div className="birth">
                      <input
                        type="text"
                        name="birthYear"
                        className="birthInput"
                        maxLength="4"
                        placeholder="YYYY"
                      ></input>
                      <span>/</span>
                      <input
                        type="text"
                        name="birthMonth"
                        className="birthInput"
                        maxLength="2"
                        placeholder="MM"
                      ></input>
                      <span>/</span>
                      <input
                        type="text"
                        name="birthDate"
                        className="birthInput"
                        maxLength="2"
                        placeholder="DD"
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>???????????? ??????</th>
                  <td className="inputOption">
                    <div className="options">
                      <div className="additionOptions">
                        <input
                          type="radio"
                          id="recommendedId"
                          name="addition"
                          value="id"
                        />
                        <label
                          htmlFor="recommendedId"
                          className="additionOption"
                        >
                          ????????? ?????????
                        </label>
                      </div>
                      <div className="additionOptions">
                        <input
                          type="radio"
                          id="eventJoin"
                          name="addition"
                          value="event"
                        />
                        <label htmlFor="eventJoin" className="additionOption">
                          ?????? ????????????
                        </label>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="????????? ????????? ?????? ?????? ??????????????? ??????????????????."
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="?????? ??????????????? ??????????????????."
                        hidden
                      />
                    </div>
                    <div className="inputConditionWrapper">
                      <p className="inputDescription">
                        ????????? ???????????? ?????? ???????????? ??? ????????? ?????? ???????????????.
                      </p>
                      <p className="inputDescription">
                        ?????? ??????, ????????? ???????????????.
                      </p>
                      <p className="inputDescription">
                        ???????????? ??? ??????????????? ??????????????????.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="accessTerms">
                  <th className="requiredCategory">??????????????????</th>
                  <td className="termsConditions">
                    <div className="terms">
                      <label>
                        <button
                          className={btnStatus}
                          onClick={this.handleBtnColor}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <strong>?????? ???????????????.</strong>
                      </label>
                      <p className="terms termsInfo">
                        ??????????????? ???????????? ?????? ????????? ???????????? ??? ????????????
                        ???????????? ????????? ??? ????????????.
                      </p>
                    </div>
                    <div className="terms">
                      <label>
                        <button
                          className={btnStatus}
                          onClick={this.handleBtnColor}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <span>???????????? ??????</span>
                        <span className="selectOption"> (??????)</span>
                      </label>
                      <Link to="#!" className="termsView">
                        ????????????
                      </Link>
                    </div>
                    <div className="terms">
                      <label>
                        <button
                          className={btnStatus}
                          onClick={this.handleBtnColor}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <span>???????????? ??????&middot;?????? ??????</span>
                        <span className="selectOption"> (??????)</span>
                        <Link to="#!" className="termsView">
                          ????????????
                        </Link>
                      </label>
                    </div>
                    <div className="terms">
                      <label>
                        <button
                          className={btnStatus}
                          onClick={this.handleBtnColor}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <span>???????????? ??????&middot;?????? ??????</span>
                        <span className="selectOption"> (??????)</span>
                      </label>
                      <Link to="#!" className="termsView">
                        ????????????
                      </Link>
                    </div>
                    <div className="terms">
                      <label>
                        <button
                          className={btnStatus}
                          onClick={this.handleBtnColor}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <span>????????????, ???????????? ??? ??????/?????? ?????? ??????</span>
                        <span className="selectOption"> (??????)</span>
                      </label>
                      <div className="terms smsEmail">
                        <label className="sms">
                          <button
                            className={btnStatus}
                            onClick={this.handleBtnColor}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <span>SMS</span>
                        </label>
                        <label>
                          <button
                            className={btnStatus}
                            onClick={this.handleBtnColor}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <span>?????????</span>
                        </label>
                      </div>
                      <p className="smsInfo">
                        ?????? ??? ??? ?????? [5% ??????] + [????????? ????????????]
                        <span className="selectOption">(??? ?????? ??? ??????)</span>
                      </p>
                    </div>
                    <div className="terms">
                      <label>
                        <button
                          className={btnStatus}
                          onClick={this.handleBtnColor}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <span>????????? ??? 14??? ???????????????.</span>
                        <span className="selectOption"> (??????)</span>
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="formSubmit">
              <button
                onClick={this.handleSignup}
                type="button"
                className="submitBtn"
              >
                ????????????
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default withRouter(SignUp);
