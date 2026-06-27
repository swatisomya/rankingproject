import requests

def get_github_data(username):

    url = f"https://api.github.com/users/{username}"

    response = requests.get(url)

    if response.status_code == 200:

        data = response.json()

        return {
            "followers": data["followers"],
            "following": data["following"],
            "public_repos": data["public_repos"]
        }

    return None