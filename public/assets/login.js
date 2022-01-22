const btn = document.getElementById("login-btn");
const close = document.getElementById("btn-close");

close.addEventListener("click", ()=>{
    document.getElementById("error-alert").classList.add(
        "hidden"
    )
})

btn.addEventListener("click", (event)=>{
        event.preventDefault();
        let data = {
            username: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        fetch("/",  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
              if (data === 2) {
                window.location.href = "admin";
            }else if (data === 1) {
                window.location.href = "conductor";
            }else if (data === 0) {
                document.getElementById("error-alert").classList.remove(
                    "hidden"
                )
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });

})
