export const CONTRIBUTIONS_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }

      pullRequestContributions(first: 100) {
        nodes {
          occurredAt
        }
      }
      
      issueContributions(first: 100) {
        nodes {
          occurredAt
        }
      }
      pullRequestReviewContributions(first: 100) {
        nodes {
          occurredAt
        }
      }
    }
  }
}
`;