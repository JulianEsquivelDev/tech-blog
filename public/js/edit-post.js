// function to edit a post
async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();

    const post_content = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
// use method "PUT" so we can update a post
    const response = await fetch(`/api/posts/${id}`, {
        method: 'Put',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);