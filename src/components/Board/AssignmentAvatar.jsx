import React, { useEffect, useState } from 'react';
import { storage } from '../../utils/appwriteConfig';
import { avatars_storage_id } from '../../utils/collections';
import AstronautPlaceholderIcon from '../Common/Icons/AstronautPlaceholderIcon';

const AssignmentAvatar = ({ content }) => {
  const [avatarsArray, setAvatarsArray] = useState([]);

  const zIndex = ['z-[3]', 'z-[2]', 'z-[1]', ''];

  const getAvatars = async () => {
    let avatars = [];

    try {
      let response = await storage.getFile(avatars_storage_id, content.owner);
      avatars.push(response.$response.requestURL);
    } catch (error) {
      avatars.push(0);
    }

    if (content.tasks.length === 0) return;

    for (let i = 0; i < content.tasks.length; i++) {
      try {
        let response = await storage.getFile(avatars_storage_id, content.tasks[i].assignedTo);
        avatars.push(response.$response.requestURL);
      } catch (error) {
        avatars.push(0);
      }
    }
    setAvatarsArray(avatars);
  };

  useEffect(() => {
    getAvatars();
  }, []);

  return (
    <div className="avatar flex mr-[7px]">
      {avatarsArray.map((avatar, index) => {
        return (
          <div
            key={index}
            className={`w-8 rounded-full -mr-3 border-4 border-base-100 bg-base-300 ${zIndex[index]}`}>
            {avatar === 0 ? (
              <AstronautPlaceholderIcon className="w-6 h-6 text-base-content text-opacity-50 ml-auto mt-[5px]" />
            ) : (
              <img src={avatar} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentAvatar;
