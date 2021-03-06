import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import MenuItemOptionContainer from '../MenuItemOptionContainer';

const modalClass = {
  base: 'modal',
  afterOpen: 'modal--after-open',
  beforeClose: 'modal--before-close'
};

const MenuItemModal = props => (
  <Modal
    isOpen={!!props.selectedItem}
    className={modalClass}
    onRequestClose={props.handleCloseModal}
    contentLabel="Order Details"
    closeTimeoutMS={150}
  >
    <div className="item-modal__container">
      <h2 className="item-modal__title">
        {props.selectedItem && props.selectedItem.type}
      </h2>
      <div className="item-modal__group--number">
        <h3 className="item-modal__subtitle">Number</h3>
        <div className="item-modal__options">
          <button
            className="button--default item-modal__option"
            onClick={props.handleDecreaseNumber}
          >
            -
          </button>
          <input
            className="item-modal__number"
            onChange={props.handleNumberInputChange}
            type="number"
            value={props.number}
          />
          <button
            className="button--default item-modal__option"
            onClick={props.handleIncreaseNumber}
          >
            +
          </button>
        </div>
      </div>
      <div className="item-modal__group--size">
        {props.sizes.length > 0 && (
          <h3 className="item-modal__subtitle">Size</h3>
        )}
        <div className="item-modal__options">
          {props.sizes.length > 0 &&
            props.sizes.map(size => (
              <MenuItemOptionContainer
                handleOptionSelect={props.handleSizeSelect}
                key={size}
                selectedItem={props.selectedItem}
                size={size}
              />
            ))}
        </div>
        {props.error && <p className="item-modal__error">{props.error}</p>}
      </div>
      <div className="item-modal__group--addons">
        {props.addons.length > 0 && (
          <h3 className="item-modal__subtitle">Addons</h3>
        )}
        <div className="item-modal__options">
          {props.addons.length > 0 &&
            props.addons.map(addon => (
              <MenuItemOptionContainer
                addon={addon}
                handleOptionSelect={props.handleAddonSelect}
                key={addon}
                selectedItem={props.selectedItem}
              />
            ))}
        </div>
      </div>
      <div className="item-modal__button-group">
        <button
          className="button--secondary-action item-modal__cancel"
          onClick={props.handleCloseModal}
        >
          Cancel
        </button>
        <button
          className="button--main-action item-modal__submit"
          onClick={props.handleAddItem}
        >
          Add item
        </button>
      </div>
    </div>
  </Modal>
);

MenuItemModal.defaultProps = {
  addons: [],
  sizes: []
};

MenuItemModal.propTypes = {
  addons: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  handleAddonSelect: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleDecreaseNumber: PropTypes.func.isRequired,
  handleIncreaseNumber: PropTypes.func.isRequired,
  handleNumberInputChange: PropTypes.func.isRequired,
  handleSizeSelect: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  selectedItem: PropTypes.shape({
    type: PropTypes.string.isRequired,
    sizes: PropTypes.objectOf(PropTypes.number),
    addons: PropTypes.objectOf(PropTypes.number)
  }).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string)
};

export default MenuItemModal;
