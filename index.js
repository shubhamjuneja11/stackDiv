function StackManager(stackOptions) {
  this.stackHolder = stackOptions.stackHolder;
  this.addButton = stackOptions.addButton;
  this.highlightClass = stackOptions.highlightClass;
  this.stackElementDataProperty = stackOptions.stackElementDataProperty;
  this.stackElementDataValue = stackOptions.stackElementDataValue;
  this.stackElementCountData = stackOptions.stackElementCountData;
};

StackManager.prototype.init = function() {
  this.setAddButtonListener();
  this.setStackElementListener();
};

StackManager.prototype.setAddButtonListener = function() {
  var _this = this;
  this.addButton.on('click', function() {
    var newElement = _this.createNewStackElement();
    _this.stackHolder.prepend(newElement);
  });
};

StackManager.prototype.setStackElementListener = function() {
  var _this = this;
  this.stackHolder.on('click', '[data-property=stack-element]', function() {
    _this.selectedElement = $(this);
    if (_this.checkLastStackElement()) {
      _this.removeElement();
    } else {
      _this.highlightSelectedElement();
    }
  });
};

StackManager.prototype.createNewStackElement = function() {
  var elementCount = this.getTotalElementsCount();
  return $('<div>',{class: 'stack','data-property': 'stack-element', html: '<span>' + elementCount + '</span>'});
};

StackManager.prototype.getTotalElementsCount = function() {
  return this.stackHolder.find('[data-property=stack-element]').length;
}

StackManager.prototype.checkLastStackElement = function() {
  return this.selectedElement.index() == 0;
};

StackManager.prototype.removeElement = function(clickedElement) {
  this.removeHighlightedElement();
  this.selectedElement.remove();
};

StackManager.prototype.highlightSelectedElement = function() {
  this.removeHighlightedElement();
  this.selectedElement.toggleClass(this.highlightClass);
};

StackManager.prototype.removeHighlightedElement = function() {
  var _this = this;
  $.each(this.selectedElement.siblings(), function(index, element) {
    $(element).removeClass(_this.highlightClass);
  });
};

$(function() {
  var stackContent = $('[data-property="mainstack"]'),
   stackOptions = {
    stackHolder: $(stackContent.find('[data-property="stackelementsholder"]')),
    addButton: $(stackContent.find('[data-property="add"]')),
    highlightClass: 'highlight',
    stackElementCountData: 'count',
  };
  var stackManager = new StackManager(stackOptions);
  stackManager.init();
});
