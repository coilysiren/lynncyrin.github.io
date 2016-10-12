function autolink(match) {
  $(match).each(function(index, element) {

    element_id = match.replace('>', '').replace(/\s+/, '') + index
    console.log(element_id)
    $(element).attr('id', element_id);
    $(element).prepend('<a class="autolink" href="#'+element_id+'"><i class="fa fa-link"></i></a>')

  });
}

$( document ).ready(function() {
  autolink('ol >')
});
