$(document).ready(function () {

    // ======================================
    // إظهار وإخفاء تفاصيل الوجبات
    // ======================================
    $(".show-details").on("change", function () {

        const targetID = $(this).data("target");
        const targetElement = $("#" + targetID);

        if ($(this).is(":checked")) {
            targetElement.stop(true, true).slideDown(200);
        } else {
            targetElement.stop(true, true).slideUp(200);
        }

    });

});


// ======================================
// دالة التحقق وإرسال الطلب
// ======================================
function validateAndSend() {

    // جلب القيم
    const customerName = $("#custName").val().trim();
    const nationalID = $("#natID").val().trim();
    const phoneNumber = $("#phone").val().trim();
    const email = $("#email").val().trim();

    // الوجبات المختارة
    const selectedMeals = $(".meal-select:checked");

    // ======================================
    // التحقق من اختيار وجبة
    // ======================================
    if (selectedMeals.length === 0) {
        alert("يرجى اختيار وجبة واحدة على الأقل");
        return;
    }

    // ======================================
    // التحقق من الاسم العربي
    // ======================================
    const arabicNamePattern = /^[\u0600-\u06FF\s]+$/;

    if (customerName === "") {
        alert("يرجى إدخال الاسم الكامل");
        return;
    }

    if (!arabicNamePattern.test(customerName)) {
        alert("الاسم يجب أن يكون باللغة العربية فقط");
        return;
    }

    // ======================================
    // التحقق من الرقم الوطني
    // ======================================
    const nationalIDPattern = /^\d{11}$/;

    if (!nationalIDPattern.test(nationalID)) {
        alert("الرقم الوطني يجب أن يحتوي على 11 رقماً");
        return;
    }

    // ======================================
    // التحقق من رقم الهاتف
    // ======================================
    const phonePattern = /^(093|094|095|096|098|099)\d{7}$/;

    if (!phonePattern.test(phoneNumber)) {
        alert("رقم الموبايل غير صحيح");
        return;
    }

    // ======================================
    // التحقق من البريد الإلكتروني
    // ======================================
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && !emailPattern.test(email)) {
        alert("البريد الإلكتروني غير صالح");
        return;
    }

    // ======================================
    // حساب السعر الإجمالي
    // ======================================
    let totalPrice = 0;

    selectedMeals.each(function () {

        const mealPrice = parseFloat($(this).data("price"));

        if (!isNaN(mealPrice)) {
            totalPrice += mealPrice;
        }

    });

    // الضريبة
    const taxAmount = totalPrice * 0.05;

    // المبلغ النهائي
    const finalAmount = totalPrice + taxAmount;

    // ======================================
    // رسالة النجاح
    // ======================================
    alert(
        "تم إرسال الطلب بنجاح!\n\n" +
        "المجموع الأساسي: " + totalPrice.toLocaleString() + " ل.س\n" +
        "الضريبة (5%): " + taxAmount.toLocaleString() + " ل.س\n" +
        "المبلغ النهائي: " + finalAmount.toLocaleString() + " ل.س"
    );

}
