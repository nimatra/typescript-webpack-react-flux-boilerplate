/// <reference path="../office/office.d.ts" />

interface IUserInfo {
    subject: string;
    userId: string;
    userAddress: string;
    userDisplayName: string;
    fromAddress: string;
    fromName: string;
    itemId: string;
}

export default class OfficeHelper {
    public getUserInfo():IUserInfo {
        var subject;
        var fromName;
        var fromAddress;
        var userAddress = Office.context.mailbox.userProfile.emailAddress;
        var userId = userAddress;
        var userDisplayName = Office.context.mailbox.userProfile.displayName;
        var itemId;

        if (Office && Office.context.mailbox.item.subject.getAsync) {
            // compose, do we need subject?
            this.addToBody("sometext some text");
        }
        else if (Office) {
            itemId = Office.context.mailbox.item.itemId;
            subject = Office.context.mailbox.item.subject;
            fromName = Office.context.mailbox.item.from.displayName;
            fromAddress = Office.context.mailbox.item.from.emailAddress;
        }

        return {
            "itemId": itemId,
            "subject": subject,
            "userId": userId,
            "fromName": fromName,
            "fromAddress": fromAddress,
            "userAddress": userAddress,
            "userDisplayName": userDisplayName
        };
    }

    public addToBody(body: string) {
        if (Office && Office.context.mailbox.item.body && Office.context.mailbox.item.body.prependAsync) {
            Office.context.mailbox.item.body.prependAsync(body, function () { });
        }
    }
}

