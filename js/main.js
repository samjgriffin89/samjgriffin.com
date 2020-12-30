function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

$(document).ready(function(){
	$('#side-nav').sidenav();

	$('#generateUuid').click(function() {
		
		var $results = $('#uuidResults');

		$results.text("");

		var uuidCountVal = $('#uuidCuont').val();

		var numberToGenerate = uuidCountVal == "" ? 1 : parseInt(uuidCountVal);

		var uuids = "";
		for (var i = 0; i <= numberToGenerate - 1; i++)
		{
			var uuid = uuidv4();
			uuids += uuid + "<br />";
		}

		var cleanUuids = $('#cleanUuid').is(":checked");

		if (cleanUuids)
		{
			uuids = uuids.replace(/-/g, '');
		}

		$results.append(uuids);
	});
});