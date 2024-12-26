"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobs = void 0;
const jobs = exports.jobs = {
  'manager-stats-remoted': {
    status: true,
    method: "GET",
    request: '/manager/stats/remoted',
    params: {},
    interval: '0 */5 * * * *',
    index: {
      name: 'statistics',
      creation: 'w',
      mapping: '{"remoted": ${data.affected_items[0]}, "apiName": ${apiName}, "cluster": "false"}'
    }
  },
  'manager-stats-analysisd': {
    status: true,
    method: "GET",
    request: '/manager/stats/analysisd',
    params: {},
    interval: '0 */5 * * * *',
    index: {
      name: 'statistics',
      creation: 'w',
      mapping: '{"analysisd": ${data.affected_items[0]}, "apiName": ${apiName}, "cluster": "false"}'
    }
  },
  'cluster-stats-remoted': {
    status: true,
    method: "GET",
    request: {
      request: '/cluster/{nodeName}/stats/remoted',
      params: {
        nodeName: {
          request: '/cluster/nodes?select=name'
        }
      }
    },
    params: {},
    interval: '0 */5 * * * *',
    index: {
      name: 'statistics',
      creation: 'w',
      mapping: '{"remoted": ${data.affected_items[0]}, "apiName": ${apiName}, "nodeName": ${nodeName}, "cluster": "true"}'
    }
  },
  'cluster-stats-analysisd': {
    status: true,
    method: "GET",
    request: {
      request: '/cluster/{nodeName}/stats/analysisd',
      params: {
        nodeName: {
          request: '/cluster/nodes?select=name'
        }
      }
    },
    params: {},
    interval: '0 */5 * * * *',
    index: {
      name: 'statistics',
      creation: 'w',
      mapping: '{"analysisd": ${data.affected_items[0]}, "apiName": ${apiName}, "nodeName": ${nodeName}, "cluster": "true"}'
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJqb2JzIiwiZXhwb3J0cyIsInN0YXR1cyIsIm1ldGhvZCIsInJlcXVlc3QiLCJwYXJhbXMiLCJpbnRlcnZhbCIsImluZGV4IiwibmFtZSIsImNyZWF0aW9uIiwibWFwcGluZyIsIm5vZGVOYW1lIl0sInNvdXJjZXMiOlsicHJlZGVmaW5lZC1qb2JzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmRleENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBJSm9iIHtcbiAgc3RhdHVzOiBib29sZWFuXG4gIG1ldGhvZDogJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdERUxFVEUnXG4gIHJlcXVlc3Q6IHN0cmluZyB8IElSZXF1ZXN0XG4gIHBhcmFtczoge31cbiAgaW50ZXJ2YWw6IHN0cmluZ1xuICBpbmRleDogSUluZGV4Q29uZmlndXJhdGlvblxuICBhcGlzPzogc3RyaW5nW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdCB7XG4gIHJlcXVlc3Q6IHN0cmluZ1xuICBwYXJhbXM6IHtcbiAgICBba2V5OnN0cmluZ106IHtcbiAgICAgIHJlcXVlc3Q/OiBzdHJpbmdcbiAgICAgIGxpc3Q/OiBzdHJpbmdbXVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgam9iczoge1trZXk6c3RyaW5nXTogSUpvYn0gPSB7XG4gICdtYW5hZ2VyLXN0YXRzLXJlbW90ZWQnOiB7XG4gICAgc3RhdHVzOiB0cnVlLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICByZXF1ZXN0OiAnL21hbmFnZXIvc3RhdHMvcmVtb3RlZCcsXG4gICAgcGFyYW1zOiB7fSxcbiAgICBpbnRlcnZhbDogJzAgKi81ICogKiAqIConLFxuICAgIGluZGV4OiB7XG4gICAgICBuYW1lOiAnc3RhdGlzdGljcycsXG4gICAgICBjcmVhdGlvbjogJ3cnLFxuICAgICAgbWFwcGluZzogJ3tcInJlbW90ZWRcIjogJHtkYXRhLmFmZmVjdGVkX2l0ZW1zWzBdfSwgXCJhcGlOYW1lXCI6ICR7YXBpTmFtZX0sIFwiY2x1c3RlclwiOiBcImZhbHNlXCJ9JyxcbiAgICB9XG4gIH0sXG4gICdtYW5hZ2VyLXN0YXRzLWFuYWx5c2lzZCc6IHtcbiAgICBzdGF0dXM6IHRydWUsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHJlcXVlc3Q6ICcvbWFuYWdlci9zdGF0cy9hbmFseXNpc2QnLFxuICAgIHBhcmFtczoge30sXG4gICAgaW50ZXJ2YWw6ICcwICovNSAqICogKiAqJyxcbiAgICBpbmRleDoge1xuICAgICAgbmFtZTogJ3N0YXRpc3RpY3MnLFxuICAgICAgY3JlYXRpb246ICd3JyxcbiAgICAgIG1hcHBpbmc6ICd7XCJhbmFseXNpc2RcIjogJHtkYXRhLmFmZmVjdGVkX2l0ZW1zWzBdfSwgXCJhcGlOYW1lXCI6ICR7YXBpTmFtZX0sIFwiY2x1c3RlclwiOiBcImZhbHNlXCJ9JyxcbiAgICB9XG4gIH0sXG4gICdjbHVzdGVyLXN0YXRzLXJlbW90ZWQnOiB7XG4gICAgc3RhdHVzOiB0cnVlLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICByZXF1ZXN0OiAnL2NsdXN0ZXIve25vZGVOYW1lfS9zdGF0cy9yZW1vdGVkJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBub2RlTmFtZToge1xuICAgICAgICAgIHJlcXVlc3Q6ICcvY2x1c3Rlci9ub2Rlcz9zZWxlY3Q9bmFtZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGFyYW1zOiB7fSxcbiAgICBpbnRlcnZhbDogJzAgKi81ICogKiAqIConLFxuICAgIGluZGV4OiB7XG4gICAgICBuYW1lOidzdGF0aXN0aWNzJyxcbiAgICAgIGNyZWF0aW9uOiAndycsXG4gICAgICBtYXBwaW5nOiAne1wicmVtb3RlZFwiOiAke2RhdGEuYWZmZWN0ZWRfaXRlbXNbMF19LCBcImFwaU5hbWVcIjogJHthcGlOYW1lfSwgXCJub2RlTmFtZVwiOiAke25vZGVOYW1lfSwgXCJjbHVzdGVyXCI6IFwidHJ1ZVwifScsXG4gICAgfVxuICB9LFxuICAnY2x1c3Rlci1zdGF0cy1hbmFseXNpc2QnOiB7XG4gICAgc3RhdHVzOiB0cnVlLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICByZXF1ZXN0OiAnL2NsdXN0ZXIve25vZGVOYW1lfS9zdGF0cy9hbmFseXNpc2QnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG5vZGVOYW1lOiB7XG4gICAgICAgICAgcmVxdWVzdDogJy9jbHVzdGVyL25vZGVzP3NlbGVjdD1uYW1lJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwYXJhbXM6IHt9LFxuICAgIGludGVydmFsOiAnMCAqLzUgKiAqICogKicsXG4gICAgaW5kZXg6IHtcbiAgICAgIG5hbWU6ICdzdGF0aXN0aWNzJyxcbiAgICAgIGNyZWF0aW9uOiAndycsXG4gICAgICBtYXBwaW5nOiAne1wiYW5hbHlzaXNkXCI6ICR7ZGF0YS5hZmZlY3RlZF9pdGVtc1swXX0sIFwiYXBpTmFtZVwiOiAke2FwaU5hbWV9LCBcIm5vZGVOYW1lXCI6ICR7bm9kZU5hbWV9LCBcImNsdXN0ZXJcIjogXCJ0cnVlXCJ9JyxcbiAgICB9XG4gIH0sXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQXNCTyxNQUFNQSxJQUEwQixHQUFBQyxPQUFBLENBQUFELElBQUEsR0FBRztFQUN4Qyx1QkFBdUIsRUFBRTtJQUN2QkUsTUFBTSxFQUFFLElBQUk7SUFDWkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsT0FBTyxFQUFFLHdCQUF3QjtJQUNqQ0MsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNWQyxRQUFRLEVBQUUsZUFBZTtJQUN6QkMsS0FBSyxFQUFFO01BQ0xDLElBQUksRUFBRSxZQUFZO01BQ2xCQyxRQUFRLEVBQUUsR0FBRztNQUNiQyxPQUFPLEVBQUU7SUFDWDtFQUNGLENBQUM7RUFDRCx5QkFBeUIsRUFBRTtJQUN6QlIsTUFBTSxFQUFFLElBQUk7SUFDWkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsT0FBTyxFQUFFLDBCQUEwQjtJQUNuQ0MsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNWQyxRQUFRLEVBQUUsZUFBZTtJQUN6QkMsS0FBSyxFQUFFO01BQ0xDLElBQUksRUFBRSxZQUFZO01BQ2xCQyxRQUFRLEVBQUUsR0FBRztNQUNiQyxPQUFPLEVBQUU7SUFDWDtFQUNGLENBQUM7RUFDRCx1QkFBdUIsRUFBRTtJQUN2QlIsTUFBTSxFQUFFLElBQUk7SUFDWkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsT0FBTyxFQUFFO01BQ1BBLE9BQU8sRUFBRSxtQ0FBbUM7TUFDNUNDLE1BQU0sRUFBRTtRQUNOTSxRQUFRLEVBQUU7VUFDUlAsT0FBTyxFQUFFO1FBQ1g7TUFDRjtJQUNGLENBQUM7SUFDREMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNWQyxRQUFRLEVBQUUsZUFBZTtJQUN6QkMsS0FBSyxFQUFFO01BQ0xDLElBQUksRUFBQyxZQUFZO01BQ2pCQyxRQUFRLEVBQUUsR0FBRztNQUNiQyxPQUFPLEVBQUU7SUFDWDtFQUNGLENBQUM7RUFDRCx5QkFBeUIsRUFBRTtJQUN6QlIsTUFBTSxFQUFFLElBQUk7SUFDWkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsT0FBTyxFQUFFO01BQ1BBLE9BQU8sRUFBRSxxQ0FBcUM7TUFDOUNDLE1BQU0sRUFBRTtRQUNOTSxRQUFRLEVBQUU7VUFDUlAsT0FBTyxFQUFFO1FBQ1g7TUFDRjtJQUNGLENBQUM7SUFDREMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNWQyxRQUFRLEVBQUUsZUFBZTtJQUN6QkMsS0FBSyxFQUFFO01BQ0xDLElBQUksRUFBRSxZQUFZO01BQ2xCQyxRQUFRLEVBQUUsR0FBRztNQUNiQyxPQUFPLEVBQUU7SUFDWDtFQUNGO0FBQ0YsQ0FBQyJ9