function StackManager(stackOptions) {
  this.stackHolder = stackOptions.stackHolder;
  this.addButton = stackOptions.addButton;
  this.highlightClass = stackOptions.highlightClass;
  this.stackCount = 0;
};

StackManager.prototype.init = function() {
  this.setAddButtonListener();
  this.setStackElementListener();
};

StackManager.prototype.setAddButtonListener = function() {
  var _this = this;
  this.addButton.click(function() {
    var newElement = _this.createNewStackElement();
    _this.stackHolder.prepend(newElement);
  });
};

StackManager.prototype.setStackElementListener = function() {
  var _this = this;
  this.stackHolder.on('click', 'div', function() {
    _this.previousSelectedElement = _this.selectedElement;
    _this.selectedElement = $(this);
    if (_this.checkLastStackElement()) {
      _this.removeElement();
    } else {
      _this.highlightSelectedElement();
    }
  });
};

StackManager.prototype.createNewStackElement = function() {
  var elementCount = this.getNewElementCount();
  return $('<div>').addClass('stack')
                   .html('<span>' + elementCount + '</span>')
                   .data('count', elementCount);
};

StackManager.prototype.getNewElementCount = function() {
  return ++this.stackCount;
}

StackManager.prototype.checkLastStackElement = function() {
  return this.getElementCount(this.selectedElement) == this.stackCount;
};

StackManager.prototype.getElementCount = function(element) {
  return element.data('count');
};

StackManager.prototype.removeElement = function() {
  this.selectedElement.remove();
  this.stackCount--;
  this.removePreviousHighlight();
};

StackManager.prototype.highlightSelectedElement = function() {
  this.removePreviousHighlight();
  this.selectedElement.toggleClass(this.highlightClass);
};

StackManager.prototype.removePreviousHighlight = function() {
  if (this.previousSelectedElement && this.compareSelectedElements()) {
    this.previousSelectedElement.removeClass(this.highlightClass);
  }
};

StackManager.prototype.compareSelectedElements = function() {
  return this.getElementCount(this.previousSelectedElement) != this.getElementCount(this.selectedElement);
};

$(function() {
  var stackOptions = {
    stackHolder: $('#stack'),
    addButton: $('#add'),
    highlightClass: 'highlight'
  };
  var stackManager = new StackManager(stackOptions);
  stackManager.init();
});