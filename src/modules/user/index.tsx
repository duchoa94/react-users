import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { searchGithubUsers } from './user.slice';
import './index.scss';

import 'react-toastify/dist/ReactToastify.css';
import { handleNonOverlappingItems } from '../non-overlap-items/non-overlap-item';

const UserPage = () => {
  const dispatch = useDispatch();
  const searchResult: any = useSelector((state: any) => state.user.searchResult);
  const isSearching = useSelector((state: any) => state.user.searching);

  const [searchValue, setSearchValue] = useState("");
  const [displayUsers, setDisplayUsers] = useState<any[]>([]);

  useEffect(() => {
    if (searchResult && searchResult.items) {
      setDisplayUsers(searchResult.items);
    }
  }, [searchResult]);

  const onInputChanged = (event: any) => {
    const { value } = event.target;
    setSearchValue(value);

    if (value && value.length >= 3) {
      setDisplayUsers([]);
      dispatch(searchGithubUsers(value));
    }
  }

  return (
    <div className="user-page">
      <div className="header">
        <h3>Search Github User</h3>
      </div>

      <div className="content">
        <input className="input-user" type="text" placeholder="Search Username" name="name" autoComplete="off"
          value={searchValue} onChange={onInputChanged}></input>

        {isSearching ? <div className="loader"><div className="loading-indicator"></div></div> : null}

        <div className="user-list">
          {displayUsers && displayUsers.length ? displayUsers.map((user: any) => {
            return (
              <div key={user.id} className="user-item">
                <img src={user.avatar_url} alt="avatar" className="avatar" />
                <div className="info">
                  <div className="username">{user.login}</div>
                  <div className="type"><b>Type:</b> {user.type}</div>
                  <div className="score"><b>Score:</b> {user.score}</div>
                </div>
              </div>
            )
          }) : null}
        </div>
      </div>
    </div>
  )
}

export default UserPage;
