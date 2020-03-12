class Github {
  constructor() {
    this.client_id = "27062c3278262f8e7ae0";
    this.client_secret = "5c8599cff9895647525295bc9641a4c1915d7bfb";
    this.repos_count = 4;
    this.repos_sort = "created: asc";
  }

  // 1 response for profile, 1 for profile repos
  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repoResponse = await fetch(`
    https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}
    `);

    const profile = await profileResponse.json(); // const profileData
    const repo = await repoResponse.json();

    // Object bc
    return {
      profile, // profile: profile || profileData
      repo
    };
  }
}
