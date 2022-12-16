const dbConnection = require('./config/mongoConnection');
const data = require('./data/');
const events = data.events;
const comments = data.comments;
const reviews = data.reviews;
const users = data.users;
const pictures = data.pictures;


const main = async () => {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    let khoaId = 0;
    try {
        const firstName = "   Khoa   ";
        const lastName = "  Tran    "
        const email = " ktran7@stevens.edu "
        const username = "  Khoatran  ";
        const password = "Qwertyuiop123";
        const phone = "  2017908762 ";
        const dob = "  11/12/2002  ";
        const gender = " male "
        const khoa = await users.createUser(firstName,lastName,email,username,password,phone,dob, gender);
        khoaId = khoa.toString();
    } catch (error) {
        console.error(error);
    }
    let mikeId = 0;
    try {
        const firstName = "  Mike   ";
        const lastName = " Nguyen    "
        const email = "   kulohugo123@gmail.com   "
        const username = "  mikenguyen ";
        const password = "Qwert11iop123";
        const phone = "  9737908762 ";
        const dob = "  08/01/1999  ";
        const gender = " male "
        const mike = await users.createUser(firstName,lastName,email,username,password,phone,dob, gender);
        mikeId = mike.toString();
    } catch (error) {
        console.error(error);
    }
    let tarunId = 0;
    try {
        const firstName = "   Tarun   ";
        const lastName = "   Dadlani   "
        const email = " tdadlani@stevens.edu "
        const username = "  Tarunmasupalli  ";
        const password = "Qwert123op123";
        const phone = "  2017902222 ";
        const dob = "  10/01/2000  ";
        const gender = " male "
        const tarun = await users.createUser(firstName,lastName,email,username,password,phone,dob, gender);
        tarunId = tarun.toString();
    } catch (error) {
        console.error(error);
    }
    let sumanId = 0;
    try {
        const firstName = "   Suman   ";
        const lastName = "  Mohanty   "
        const email = " smohanty@stevens.edu "
        const username = "  sumanmohanty  ";
        const password = "Qwerty111p123";
        const phone = "  2017903333 ";
        const dob = "  01/14/1999  ";
        const gender = " female "
        const suman = await users.createUser(firstName,lastName,email,username,password,phone,dob, gender);
        sumanId = suman.toString();
    } catch (error) {
        console.error(error);
    }
    let maniId = 0;
    try {
        const firstName = "   Mani   ";
        const lastName = "  Masupalli   "
        const email = " mmasupalli@stevens.edu "
        const username = "  manimasupalli  ";
        const password = "Qwertyba11p123";
        const phone = "  2017901111 ";
        const dob = "  05/30/1998  ";
        const gender = " male "
        const mani = await users.createUser(firstName,lastName,email,username,password,phone,dob, gender);
        maniId = mani.toString();
    } catch (error) {
        console.error(error);
    }
    let arjunId = 0;
    try {
        const firstName = "   Arjun   ";
        const lastName = "  Khatri   "
        const email = " akhatri@stevens.edu "
        const username = "  arjunkhatri  ";
        const password = "Qwert1122p123";
        const phone = "  2017904567 ";
        const dob = "  09/23/2001  ";
        const gender = " male "
        const arjun = await users.createUser(firstName,lastName,email,username,password,phone,dob, gender);
        arjunId = arjun.toString();
    } catch (error) {
        console.error(error);
    }
    let birthdayId = 0;
    try {
        const user_id = arjunId;
        const event_title = "   Birthday Party      ";
        const type = "birthday"; //this should be a boolean?
        const organizer_name = "    Arjun   ";
        const description = " This is a birthday party for my brother! Cake included, gifts not required but encouraged.   ";
        const start_date_time = "   2022-12-30T18:00:00.000Z   ";
        const end_date_time = "   2022-12-30T21:00:00.000Z  ";
        const location = {
            City : "Hoboken",
            State : "New Jersey",
            Country : "United States of America",
            Zipcode : "07030"
        };
        const tags = ["birthday", "food", "strong17", " gift not required"];
        const pictures_allowed = false;
        const comments_allowed = true;
        const public_event = false;
        const birthday = await events.createEvent(user_id,event_title,type,organizer_name,description,start_date_time,end_date_time,location,tags,pictures_allowed,comments_allowed,public_event)
        birthdayId = birthday._id;
    } catch (error) {
        console.error(error);
    }

    let graduationId = 0;
    try {
        const user_id = mikeId;
        const event_title = "   Khoa graduation    ";
        const type = "graduation"; //this should be a boolean?
        const organizer_name = "  Mikey   ";
        const description = " This is a surprise party for Khoa to celebrate his graduation.   ";
        const start_date_time = "   2023-05-27T11:00:00.000Z   ";
        const end_date_time = "   2023-05-27T14:00:00.000Z ";
        const location = {
            City : "Morris Town",
            State : "New Jersey",
            Country : "United States of America",
            Zipcode : "07883"
        };
        const tags = ["graduation", "food", "next chapter", " gift not required"];
        const pictures_allowed = false;
        const comments_allowed = true;
        const public_event = false;
        const graduation = await events.createEvent(user_id,event_title,type,organizer_name,description,start_date_time,end_date_time,location,tags,pictures_allowed,comments_allowed,public_event)
        graduationId = graduation._id;
    } catch (error) {
        console.error(error);
    }

    try {
        let event = await events.add_guest(birthdayId, "ktran7@stevens.edu");
        event = await events.add_guest(birthdayId, "kulohugo123@gmail.com");
    }catch(error){
        console.error(error);
    }

    try {
        let event = await events.add_guest(graduationId, "akhatri@stevens.edu");
        event = await events.add_guest(graduationId, "smohanty@stevens.edu");
        event = await events.add_guest(graduationId, "tdadlani@stevens.edu");
        event = await events.add_guest(graduationId, "mmasupalli@stevens.edu");
    }catch(error){
        console.error(error);
    }

    try{
        let user = await users.rsvp_event(khoaId, birthdayId);
        user = await users.rsvp_event(mikeId, birthdayId);
        user = await users.rsvp_event(arjunId,graduationId);
        user = await users.rsvp_event(sumanId, graduationId);
    }catch(error){
        console.error(error);
    }

    try {
        const reviewerName = "Supreet Sidhu";
        const review = "This was a great event!";
        const rating = 4.0;
        await reviews.createReview(birthdayId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "John Doe";
        const review = "I wanted to see more food.";
        const rating = 3.0;
        await reviews.createReview(birthdayId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "Cheeto Man";
        const review = "It was boring";
        const rating = 4.0;
        await reviews.createReview(graduationId,reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "Khoa Tran";
        const review = "I loved the decoration.";
        const rating = 4.0;
        await reviews.createReview(birthdayId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "John Doe";
        const review = "We love the people.";
        const rating = 4.9;
        await reviews.createReview(graduationId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "Cheeto Can";
        const review = "It was too crowded.";
        const rating = 1.4;
        await reviews.createReview(graduationId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }


    try {
        const reviewerName = "Tarun Dadlali";
        const review = "I love white castle";
        const rating = 2.7;
        await reviews.createReview(birthdayId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "John Doe";
        const review = "I would love to be invited again.";
        const rating = 1.9;
        await reviews.createReview(graduationId,reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }

    try {
        const reviewerName = "Cheeto Man";
        const review = "when is the next party ? ";
        const rating = 4.5;
        await reviews.createReview(birthdayId, reviewerName, review, rating);
    } catch (error) {
        console.error(error);
    }
    console.log("RESULTS--------------------------------------------------------------")
    try{
        const all_events = await events.getAllEvents();
        console.log(all_events);
    }catch(error){
        console.error(error);
    }

    console.log("BIRTHDAY REVIEWS--------------------------------------------------------------")
    try{
        const all_reviews = await reviews.getAllReviews(birthdayId);
        console.log(all_reviews);
    }catch(error){
        console.error(error);
    }

    console.log("GRADUATION REVIEWS--------------------------------------------------------------")
    try{
        const all_reviews = await reviews.getAllReviews(graduationId);
        console.log(all_reviews);
    }catch(error){
        console.error(error);
    }

    console.log("All USERS--------------------------------------------------------------")
    try{
        const all_users = await users.getAllUsers();
        console.log(all_users);
    }catch(error){
        console.error(error);
    }

    console.log('Done seeding database');

    await dbConnection.closeConnection();
}

main();