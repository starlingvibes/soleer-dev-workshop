fn main() {
    let odd_number = 3;
    let is_gone = true;
    let temperature: f32 = 12.4;
    let mut students_array: [u32; 10] = [21, 19, 18, 4, 12, 91, 21, 42, 10, 54];
    let students_age_array: [f32; 5] = [21.5, 10.1, 45.5, 23.5, 89.4];
    students_array[3] = 21;
    let counter: Vec<i8> = vec![4, -5, 7];
    let mut new_counter: Vec<u8> = Vec::new();
    new_counter.push(2);
    new_counter.push(10);
    println!("{:?}", new_counter);
    new_counter.remove(0);
    println!(
        "{:?} {:?} {} {} {} {:?} {:?}",
        students_array, students_age_array, temperature, is_gone, odd_number, counter, new_counter
    );

    if new_counter[0] > 10 {
        new_counter.push(100);
    } else {
        new_counter.push(5);
    }
    println!("{:?}", new_counter);

    for num in 1..=100 {
        if num % 5 == 0 && num % 3 == 0 {
            println!("fizzbuzz");
        } else if num & 5 == 0 {
            println!("buzz");
        } else if num % 3 == 0 {
            println!("fizz")
        } else {
            println!("{}", num);
        }
    }
}
