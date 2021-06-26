import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'

const getSelectedObj = (options, labelKey, valueKey, selected) => {
  for (let i = 0; i < options.length; i++) {
    const item = options[i]
    const key = valueKey || 'value'
    if (typeof item === 'object') {
      if (item.options && item.options.length) {
        const { labelKey: lKey, valueKey: vKey, options: subOptions } = item
        const obj = getSelectedObj(subOptions, lKey, vKey, selected)
        if (!isEmpty(obj)) {
          return obj
        }
      }
      if (item[key] === selected) {
        return { defaultLabel: item[labelKey || 'label'], defaultValue: selected }
      }
    } else if (item === selected) {
      return { defaultLabel: selected, defaultValue: selected }
    }
  }
  return { defaultLabel: selected, defaultValue: selected }
}

const Dropdown = React.memo(({
  options,
  selected,
  onChangeOption,
  styles,
  // position,
  optionTitle,
  placeholder,
  labelKey,
  valueKey,
  children,
  changeKey,
  disabled,
  staticSearch,
  searchProps: parentSearchProps,
  searchKeyMap = ['label', 'value'],
  visible,
}) => {
  // const [visible, toggle] = useState(false)
  const [expanded, toggleExpand] = useState({})
  const [filteredOptions, updateOptions] = useState(staticSearch ? options : [])
  const [selectedOption, updateSeletcted] = useState({ selectedValue: selected, selectedLabel: selected })
  useEffect(() => {
    let defaultValue = selected
    let defaultLabel = selected
    if (options.length) {
      ({ defaultLabel, defaultValue } = getSelectedObj(options, labelKey, valueKey, selected))
    }
    updateSeletcted({ selectedLabel: defaultLabel, selectedValue: defaultValue })
  }, [selected])
  const { selectedValue, selectedLabel } = selectedOption
  // if (selectedOption && typeof selectedOption === 'object') {
  //   selectedValue = valueKey ? selectedOption[valueKey] : selectedOption.value
  //   selectedLabel = labelKey ? selectedOption[labelKey] : selectedOption.label
  // }
  const onItemPress = (optionValue, optionObj) => {
    if (optionObj.expandable) {
      toggleExpand({
        ...expanded,
        [optionValue]: !expanded[optionValue],
      })
      return
    }
    if (disabled) {
      return
    }
    // updateSeletcted(isEmpty(optionObj) ? optionValue : optionObj)
    onChangeOption(optionValue, optionObj, changeKey)
    // toggle(!visible)
  }
  const renderMenuItem = (option, lKey, vKey, itemRenderer) => {
    let optionLabel = option
    let optionValue = option
    let optionObj = {}
    let optionKey = option
    let optionIcon = null
    let expandOptions = null
    let expandable = false
    if (typeof option === 'object') {
      optionLabel = lKey ? option[lKey] : option.label
      optionValue = vKey ? option[vKey] : option.value
      optionObj = option
      optionKey = optionValue
      optionIcon = option.icon
      expandOptions = option.expandable && option.options
      expandable = !!option.expandable
    }
    return itemRenderer({
      label: optionLabel,
      value: optionValue,
      icon: optionIcon,
      expanded: expanded[optionKey],
      key: optionKey,
      expandOptions,
      optionObj,
      expandable,
      selected: selectedValue === optionValue,
      onPress: () => onItemPress(optionValue, optionObj),
      renderMenuItem,
    })
  }
  const renderDropDownOptions = (itemRenderer) => {
    if (staticSearch) {
      return filteredOptions.map((option) => {
        if (!option) {
          return null
        }
        return renderMenuItem(option, labelKey, valueKey, itemRenderer)
      })
    }
    return options.map((option) => {
      if (!option) {
        return null
      }
      return renderMenuItem(option, labelKey, valueKey, itemRenderer)
    })
  }

  const [value, updateValue] = useState('')
  useEffect(() => {
    if (visible && staticSearch) {
      updateValue('')
      updateOptions(options)
    }
  }, [visible])
  const debouncedHandler = useCallback(debounce(v => filterOptions(v), 50), [])
  const filterOptions = (query) => {
    const modOptions = options.filter((optionItem) => {
      let itemString = optionItem
      if (typeof item === 'object') {
        searchKeyMap.map((searchKey) => {
          itemString = optionItem[searchKey].toLowerCase()
          return itemString.includes(query.toLowerCase())
        })
      }
      return itemString.toLowerCase().includes(query.toLowerCase())
    })
    updateOptions(modOptions)
  }

  const onSearch = (stockQuery) => {
    updateValue(stockQuery)
    debouncedHandler(stockQuery)
  }
  let searchProps = parentSearchProps
  if (staticSearch && !parentSearchProps) {
    searchProps = {
      onChangeText: onSearch,
      searchValue: value,
    }
  }
  return children({
    selectedLabel,
    onChangeOption,
    styles,
    placeholder,
    renderDropDownOptions,
    optionTitle,
    searchProps,
  })
})

export default Dropdown

Dropdown.defaultProps = {
}

Dropdown.propTypes = {
  // options: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.object),
  //   PropTypes.arrayOf(PropTypes.string),
  //   PropTypes.arrayOf(PropTypes.number),
  //   PropTypes.arrayOf(PropTypes.element),
  // ]).isRequired,
  onChangeOption: PropTypes.func.isRequired,
  // selected: PropTypes.oneOfType(PropTypes.string, PropTypes.number, PropTypes.object),
  // position: PropTypes.oneOfType(PropTypes.string, PropTypes.number, PropTypes.object),
}