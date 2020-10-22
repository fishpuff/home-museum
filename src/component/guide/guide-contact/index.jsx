import React from 'react';
import propTypes from 'prop-types';
import './index.scss';
import { useHistory } from 'react-router-dom';

import ContactListItem from '../contact-list-item';

const generateCharactersMap = () => {
  const chartAt = 65;
  const _ = {};
  for (let i = 0; i < 26; i += 1) {
    _[String.fromCharCode(chartAt + i)] = [];
  }
  return _;
};

export default function GuideContact({ contacts }) {
  const history = useHistory();

  const charactersMap = generateCharactersMap();

  contacts.forEach((contact) => {
    const { lastName } = contact;
    if (charactersMap[lastName.substr(0, 1).toUpperCase()].length === 0) {
      charactersMap[lastName.substr(0, 1).toUpperCase()]
        .push(
          {
            ...contact,
            character: lastName.substr(0, 1).toUpperCase(),
          },
        );
    } else {
      charactersMap[lastName.substr(0, 1).toUpperCase()].push(contact);
    }
  });

  const contactsForRender = Object.keys(charactersMap)
    .map((key) => [...charactersMap[key]])
    .flat();

  return (
    <div className="guide-contacts">
      <div className="contact-line" />
      <div className="contact-line" />
      <div className="contact-line" />
      <div className="guide-contacts-container">
        <div className="guide-contact-list">
          {
                    contactsForRender
                      .slice(0, contactsForRender.length / 4)
                      .map((contact) => <ContactListItem key={contact.id} contact={contact} />)
                }
        </div>
        <div className="guide-contact-list">
          {
                    contactsForRender
                      .slice(contactsForRender.length / 4, contactsForRender.length / 2)
                      .map((contact) => <ContactListItem key={contact.id} contact={contact} />)
                }
        </div>
        <div className="guide-contact-list">
          {
                    contactsForRender
                    // eslint-disable-next-line no-mixed-operators
                      .slice(contactsForRender.length / 2, contactsForRender.length / 4 * 3)
                      .map((contact) => <ContactListItem key={contact.id} contact={contact} />)
                }
        </div>
        <div className="guide-contact-list">
          {
                    contactsForRender
                    // eslint-disable-next-line no-mixed-operators
                      .slice(contactsForRender.length / 4 * 3, contactsForRender.length)
                      .map((contact) => <ContactListItem key={contact.id} contact={contact} />)
                }
        </div>
      </div>
      <div className="guide-line">
        <div className="guide-line-title">GUIDE ME BY NAME</div>
        <div className="guide-search" />
        <div className="guide-back-to-home" onClick={() => history.push('/home')} />
      </div>
    </div>
  );
}

GuideContact.propTypes = {
  // eslint-disable-next-line react/require-default-props
  contacts: propTypes.array.isRequired[Symbol.hasInstance],
};
