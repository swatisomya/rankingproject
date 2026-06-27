import requests

def get_github_data(username):

    url = f"https://api.github.com/users/{username}"

    response = requests.get(url)

    if response.status_code == 200:

        data = response.json()

        return {
            "followers": data.get("followers", 0),
            "following": data.get("following", 0),
            "public_repos": data.get("public_repos", 0)
        }

    return {
        "error": "GitHub user not found"
    }