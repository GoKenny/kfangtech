

function showContents() {
	 changeString();
	showContent1();
	showContent2();
	showContent3();
	showContent4();
}

// Don't try to change the trigger itself'
function changeString() {
	showContents = document.getElementById('showContents');
	showContents.innerHTML = 'something';
}

function showContent1() {
	message = 'something1<br>';
	content1 = document.getElementById('content1');
	content1.innerHTML = message;
}

function showContent2() {
	message = 'something2<br>';
	var content2 = document.getElementById('content2');
	content2.innerHTML = message;
}

function showContent3() {
	message = 'something3<br>';
	content3 = document.getElementById('content3');
	content3.innerHTML = message;
}

function showContent4() {

	content4 = document.getElementById('content4');
	data = content4.innerHTML;
	if (data == '') {

		m1 = '<a href=http://google.com> Google</a>';
		m2 = '<table> <tr> <td> Table Here </td> </tr> <tr> <td> Table Here </td> </tr><tr> <td> Table Here </td> </tr><tr> <td> Table Here </td> </tr>    <tr> <td> Table Here </td> </tr><tr> <td> Table Here </td> </tr><tr> <td> Table Here </td> </tr>          </table > ';
		m3 = '<ul>   <li>List Here</li>   <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li> <li>List Here</li>      </ul>          ';
		m4 = '<textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    <textarea> TextArea Here </textarea>    ';
		message = 'something4' + m1 + m2 + m3 + m4;
		message = message + message + message + message + message + message;

		content4.innerHTML = message;

	} else {
		content4.innerHTML = '';
	}

	/** Hide And Show, Not Stable */
	// var display = content4.style.display;
	// if (display == 'none')
	// content4.style.display = '';
	// else
	// content4.style.display = 'none';
}
