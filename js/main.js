function autolink(match) {
  $(match).each(function(index, element) {

    element_id = (match+index).replace('>', '').replace(/\s+/, '').replace(/\s+/, '')
    $(element).attr('id', element_id);
    $(element).prepend('<a class="autolink" href="#'+element_id+'"><i class="fa fa-link"></i></a>')

  });
}

$( document ).ready(function() {
  autolink('article ol >')
  window.location.href = window.location.hash
});
