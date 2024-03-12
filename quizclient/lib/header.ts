const RateLimiterRes = {
    msBeforeNext: 250, // Number of milliseconds before next action can be done
    remainingPoints: 0, // Number of remaining points in current duration 
    consumedPoints: 5, // Number of consumed points in current duration 
    isFirstInDuration: false, // action is first in current duration 
}

const opts = {
    points: 6, // 6 points
    duration: 1, // Per second
  };

export const config: any = {
    'Content-Type': 'application/json',
    "Retry-After": RateLimiterRes.msBeforeNext / 1000,
    "X-RateLimit-Limit": opts.points,
    "X-RateLimit-Remaining": RateLimiterRes.remainingPoints,
    "X-RateLimit-Reset": new Date(Date.now() + RateLimiterRes.msBeforeNext)
}