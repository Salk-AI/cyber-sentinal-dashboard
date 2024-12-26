"use strict";

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  rootDir: "../",
  setupFiles: ["<rootDir>/test/polyfills.ts", "<rootDir>/test/setupTests.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.jest.ts"],
  roots: ["<rootDir>"],
  coverageDirectory: "./coverage",
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/test/mocks/styleMock.ts",
    "^ui/(.*)": "<rootDir>/../../src/legacy/ui/public/$1/"
  },
  coverageReporters: ["lcov", "text", "cobertura"],
  testMatch: ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx"],
  collectCoverageFrom: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "!**/models/**", "!**/node_modules/**", "!**/index.ts", "!<rootDir>/index.js", "!<rootDir>/public/app.js", "!<rootDir>/public/temporary/**", "!<rootDir>/babel.config.js", "!<rootDir>/test/**", "!<rootDir>/server/**", "!<rootDir>/coverage/**", "!<rootDir>/scripts/**", "!<rootDir>/build/**", "!<rootDir>/cypress/**", "!**/vendor/**", "!**/index.d.ts", "!**/lib/field/**",
  // There is a compile error in monaco-editor, ignore related components
  "!**/components/JSONDiffEditor/**"],
  clearMocks: true,
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  modulePathIgnorePatterns: ["indexManagementDashboards"],
  testEnvironment: "jsdom"
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicm9vdERpciIsInNldHVwRmlsZXMiLCJzZXR1cEZpbGVzQWZ0ZXJFbnYiLCJyb290cyIsImNvdmVyYWdlRGlyZWN0b3J5IiwibW9kdWxlTmFtZU1hcHBlciIsImNvdmVyYWdlUmVwb3J0ZXJzIiwidGVzdE1hdGNoIiwiY29sbGVjdENvdmVyYWdlRnJvbSIsImNsZWFyTW9ja3MiLCJ0ZXN0UGF0aElnbm9yZVBhdHRlcm5zIiwibW9kdWxlUGF0aElnbm9yZVBhdHRlcm5zIiwidGVzdEVudmlyb25tZW50Il0sInNvdXJjZXMiOlsiamVzdC5jb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcm9vdERpcjogXCIuLi9cIixcbiAgc2V0dXBGaWxlczogW1wiPHJvb3REaXI+L3Rlc3QvcG9seWZpbGxzLnRzXCIsIFwiPHJvb3REaXI+L3Rlc3Qvc2V0dXBUZXN0cy50c1wiXSxcbiAgc2V0dXBGaWxlc0FmdGVyRW52OiBbXCI8cm9vdERpcj4vdGVzdC9zZXR1cC5qZXN0LnRzXCJdLFxuICByb290czogW1wiPHJvb3REaXI+XCJdLFxuICBjb3ZlcmFnZURpcmVjdG9yeTogXCIuL2NvdmVyYWdlXCIsXG4gIG1vZHVsZU5hbWVNYXBwZXI6IHtcbiAgICBcIlxcXFwuKGNzc3xsZXNzfHNjc3MpJFwiOiBcIjxyb290RGlyPi90ZXN0L21vY2tzL3N0eWxlTW9jay50c1wiLFxuICAgIFwiXnVpLyguKilcIjogXCI8cm9vdERpcj4vLi4vLi4vc3JjL2xlZ2FjeS91aS9wdWJsaWMvJDEvXCIsXG4gIH0sXG4gIGNvdmVyYWdlUmVwb3J0ZXJzOiBbXCJsY292XCIsIFwidGV4dFwiLCBcImNvYmVydHVyYVwiXSxcbiAgdGVzdE1hdGNoOiBbXCIqKi8qLnRlc3QuanNcIiwgXCIqKi8qLnRlc3QuanN4XCIsIFwiKiovKi50ZXN0LnRzXCIsIFwiKiovKi50ZXN0LnRzeFwiXSxcbiAgY29sbGVjdENvdmVyYWdlRnJvbTogW1xuICAgIFwiKiovKi50c1wiLFxuICAgIFwiKiovKi50c3hcIixcbiAgICBcIioqLyouanNcIixcbiAgICBcIioqLyouanN4XCIsXG4gICAgXCIhKiovbW9kZWxzLyoqXCIsXG4gICAgXCIhKiovbm9kZV9tb2R1bGVzLyoqXCIsXG4gICAgXCIhKiovaW5kZXgudHNcIixcbiAgICBcIiE8cm9vdERpcj4vaW5kZXguanNcIixcbiAgICBcIiE8cm9vdERpcj4vcHVibGljL2FwcC5qc1wiLFxuICAgIFwiITxyb290RGlyPi9wdWJsaWMvdGVtcG9yYXJ5LyoqXCIsXG4gICAgXCIhPHJvb3REaXI+L2JhYmVsLmNvbmZpZy5qc1wiLFxuICAgIFwiITxyb290RGlyPi90ZXN0LyoqXCIsXG4gICAgXCIhPHJvb3REaXI+L3NlcnZlci8qKlwiLFxuICAgIFwiITxyb290RGlyPi9jb3ZlcmFnZS8qKlwiLFxuICAgIFwiITxyb290RGlyPi9zY3JpcHRzLyoqXCIsXG4gICAgXCIhPHJvb3REaXI+L2J1aWxkLyoqXCIsXG4gICAgXCIhPHJvb3REaXI+L2N5cHJlc3MvKipcIixcbiAgICBcIiEqKi92ZW5kb3IvKipcIixcbiAgICBcIiEqKi9pbmRleC5kLnRzXCIsXG4gICAgXCIhKiovbGliL2ZpZWxkLyoqXCIsXG4gICAgLy8gVGhlcmUgaXMgYSBjb21waWxlIGVycm9yIGluIG1vbmFjby1lZGl0b3IsIGlnbm9yZSByZWxhdGVkIGNvbXBvbmVudHNcbiAgICBcIiEqKi9jb21wb25lbnRzL0pTT05EaWZmRWRpdG9yLyoqXCIsXG4gIF0sXG4gIGNsZWFyTW9ja3M6IHRydWUsXG4gIHRlc3RQYXRoSWdub3JlUGF0dGVybnM6IFtcIjxyb290RGlyPi9idWlsZC9cIiwgXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL1wiXSxcbiAgbW9kdWxlUGF0aElnbm9yZVBhdHRlcm5zOiBbXCJpbmRleE1hbmFnZW1lbnREYXNoYm9hcmRzXCJdLFxuICB0ZXN0RW52aXJvbm1lbnQ6IFwianNkb21cIixcbn07XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUFBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHO0VBQ2ZDLE9BQU8sRUFBRSxLQUFLO0VBQ2RDLFVBQVUsRUFBRSxDQUFDLDZCQUE2QixFQUFFLDhCQUE4QixDQUFDO0VBQzNFQyxrQkFBa0IsRUFBRSxDQUFDLDhCQUE4QixDQUFDO0VBQ3BEQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUM7RUFDcEJDLGlCQUFpQixFQUFFLFlBQVk7RUFDL0JDLGdCQUFnQixFQUFFO0lBQ2hCLHFCQUFxQixFQUFFLG1DQUFtQztJQUMxRCxVQUFVLEVBQUU7RUFDZCxDQUFDO0VBQ0RDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7RUFDaERDLFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztFQUM3RUMsbUJBQW1CLEVBQUUsQ0FDbkIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFDZixxQkFBcUIsRUFDckIsY0FBYyxFQUNkLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsZ0NBQWdDLEVBQ2hDLDRCQUE0QixFQUM1QixvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGtCQUFrQjtFQUNsQjtFQUNBLGtDQUFrQyxDQUNuQztFQUNEQyxVQUFVLEVBQUUsSUFBSTtFQUNoQkMsc0JBQXNCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSx5QkFBeUIsQ0FBQztFQUN2RUMsd0JBQXdCLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztFQUN2REMsZUFBZSxFQUFFO0FBQ25CLENBQUMifQ==